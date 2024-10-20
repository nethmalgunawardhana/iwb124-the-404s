import ballerina/http;
import ballerina/io;
import ballerina/log;
import ballerina/time;
import ballerina/uuid;
import ballerinax/mongodb;

configurable string host = "localhost";
configurable int port = 27017;

final mongodb:Client mongoDb = check new ({
    connection: {
        serverAddress: {
            host,
            port
        }
    }
});

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowHeaders: ["REQUEST_ID", "Content-Type"],
        exposeHeaders: ["RESPONSE_ID"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        maxAge: 84900
    }
}

service / on new http:Listener(9091) {
    private final mongodb:Database eventDb;

    function init() returns error? {
        self.eventDb = check mongoDb->getDatabase("EventDb");
        io:println("MongoDB connected to EventDb");
    }

    isolated resource function post admin/access(@http:Payload AdminAccessInput input) returns AdminAccess|error {
        string id = uuid:createType1AsString();
        AdminAccess adminAccess = {id: id, ...input};
        mongodb:Collection adminAccessCollection = check self.eventDb->getCollection("AdminAccess");
        check adminAccessCollection->insertOne(adminAccess);
        return adminAccess;
    }

    resource function get admin/access() returns AdminAccess[]|error {
        mongodb:Collection adminAccessCollection = check self.eventDb->getCollection("AdminAccess");
        stream<AdminAccess, error?> result = check adminAccessCollection->find();
        AdminAccess[] adminAccessList = [];
        int count = 0;
        check result.forEach(function(AdminAccess|error adminAccess) {
            if (adminAccess is AdminAccess) {
                adminAccessList.push(adminAccess);
                count += 1;
            } else {
                log:printError(string `Error processing admin access submission: ${adminAccess.message()}`, 'error = adminAccess);
            }
        });
        log:printInfo(string `Successfully retrieved ${count} admin access submissions`);
        return adminAccessList;
    }

    resource function options events(http:Caller caller, http:Request req) returns error? {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "REQUEST_ID, Content-Type");
        check caller->respond(res);
    }

    resource function get events() returns Event[]|error {
        mongodb:Collection events = check self.eventDb->getCollection("Event");
        stream<Event, error?> result = check events->find();
        Event[] eventList = [];
        int count = 0;
        check result.forEach(function(Event|error event) {
            if (event is Event) {
                eventList.push(event);
                count += 1;
            } else {
                log:printError(string `Error processing event: ${event.message()}`, 'error = event);
            }
        });
        log:printInfo(string `Successfully retrieved ${count} events`);
        return eventList;
    }

    resource function get events/[string id]() returns Event|error {
        return getEvent(self.eventDb, id);
    }

    resource function post bookings(@http:Payload BookingInput input) returns Booking|error {
        string id = uuid:createType1AsString();
        string bookingDate = time:utcToString(time:utcNow()).substring(0, 10); // Get current date in YYYY-MM-DD format
        Booking booking = {id, bookingDate, ...input};
        mongodb:Collection bookings = check self.eventDb->getCollection("Booking");
        check bookings->insertOne(booking);
        return booking;
    }

    resource function get bookings() returns Booking[]|error {
        mongodb:Collection bookings = check self.eventDb->getCollection("Booking");
        stream<Booking, error?> result = check bookings->find();
        Booking[] bookingList = [];
        int count = 0;
        check result.forEach(function(Booking|error booking) {
            if (booking is Booking) {
                bookingList.push(booking);
                count += 1;
            } else {
                log:printError(string `Error processing booking: ${booking.message()}`, 'error = booking);
            }
        });
        log:printInfo(string `Successfully retrieved ${count} bookings`);
        return bookingList;
    }

    resource function post events(@http:Payload EventInput input) returns Event|error {
        string id = uuid:createType1AsString();
        Event event = {id, ...input};
        mongodb:Collection events = check self.eventDb->getCollection("Event");
        check events->insertOne(event);
        return event;
    }

    resource function get events/search(string query) returns Event[]|error {
        mongodb:Collection events = check self.eventDb->getCollection("Event");

        // search filter using regex for case-insensitive search across multiple fields
        map<json> searchFilter = {
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"description": {"$regex": query, "$options": "i"}},
                {"institute": {"$regex": query, "$options": "i"}},
                {"tags": {"$regex": query, "$options": "i"}}
            ]
        };

        stream<Event, error?> result = check events->find(searchFilter);
        Event[] eventList = [];
        check result.forEach(function(Event|error event) {
            if (event is Event) {
                eventList.push(event);
            }
        });

        return eventList;
    }

    resource function put events/[string id](@http:Payload EventUpdate update) returns Event|error {
        mongodb:Collection events = check self.eventDb->getCollection("Event");
        //  map<json> to hold the fields to update.
        map<json> updateFields = {};
        if update.name is string {
            updateFields["name"] = update.name;
        }
        if update.description is string {
            updateFields["description"] = update.description;
        }
        if update.date is string {
            updateFields["date"] = update.date;
        }
        if update.time is string {
            updateFields["time"] = update.time;
        }
        if update.locationLink is string {
            updateFields["locationLink"] = update.locationLink;
        }
        if update.locationLink is string {
            updateFields["payment"] = update.payment;
        }
        if update.institute is string {
            updateFields["institute"] = update.institute;
        }
        if update.organizingCommittee is string {
            updateFields["organizingCommittee"] = update.organizingCommittee;
        }
        if update.tags is string {
            updateFields["tags"] = update.tags;
        }
        if update.image is string {
            updateFields["image"] = update.image;
        }
        if update.registrationLink is string {
            updateFields["registrationLink"] = update.registrationLink;
        }
        if update.resources is string {
            updateFields["resources"] = update.resources;
        }

        mongodb:UpdateResult updateResult = check events->updateOne({id}, {set: updateFields});
        if updateResult.modifiedCount != 1 {
            return error(string `Failed to update the event with id ${id}`);
        }
        return getEvent(self.eventDb, id);
    }

    resource function delete bookings/[string id]() returns string|error {
        mongodb:Collection bookings = check self.eventDb->getCollection("Booking");
        mongodb:DeleteResult deleteResult = check bookings->deleteOne({id});
        if deleteResult.deletedCount != 1 {
            return error(string `Failed to delete the booking ${id}`);
        }
        return id;
    }

    resource function delete events/[string id]() returns string|error {
        mongodb:Collection events = check self.eventDb->getCollection("Event");
        mongodb:DeleteResult deleteResult = check events->deleteOne({id});
        if deleteResult.deletedCount != 1 {
            return error(string `Failed to delete the event ${id}`);
        }
        return id;
    }
}

isolated function getEvent(mongodb:Database eventDb, string id) returns Event|error {
    mongodb:Collection events = check eventDb->getCollection("Event");
    stream<Event, error?> findResult = check events->find({id});
    Event[] result = check from Event e in findResult
        select e;
    if result.length() != 1 {
        return error(string `Failed to find an event with id ${id}`);
    }
    return result[0];
}

type ChatbotRequest record {|
    string message;
|};

public type EventInput record {|
    string name;
    string description;
    string date;
    string time;
    string locationLink;
    string payment;
    string institute;
    string organizingCommittee;
    string tags;
    string image;
    string registrationLink;
    string resources;
|};

public type EventUpdate record {|
    string name?;
    string description?;
    string date?;
    string time?;
    string locationLink?;
    string payment?;
    string institute?;
    string organizingCommittee?;
    string tags?;
    string image?;
    string registrationLink?;
    string resources?;
|};

public type BookingInput record {|
    string eventId;
    string userId?;

|};

public type Booking record {|
    readonly string id;
    string bookingDate;
    *BookingInput;
|};

public type Event record {|
    readonly string id;
    *EventInput;
|};

public type AdminAccessInput record {|
    string name;
    string phoneNumber;
    string request;
    string description;
|};

public type AdminAccess record {|
    readonly string id;
    *AdminAccessInput;
|};
