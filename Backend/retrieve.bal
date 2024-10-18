import ballerina/http;
import ballerina/uuid;
import ballerinax/mongodb;
import ballerina/io;
import ballerina/log;

configurable string mongoHost = "localhost";
configurable int mongoPort = 27017;

final mongodb:Client mongoClient = check new ({
    connection: {
        serverAddress: {
            host: mongoHost,
            port: mongoPort
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

service / on new http:Listener(9092) {
    private final mongodb:Database eventDb;

    function init() returns error? {
        self.eventDb = check mongoClient->getDatabase("EventDb");
        io:println("MongoDB connected to EventDb");
    }

    resource function options events(http:Caller caller, http:Request req) returns error? {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control -Allow-Headers", "REQUEST_ID, Content-Type");
        check caller->respond(res);
    }

    resource function get events() returns RetrieveEvent[]|error {
        mongodb:Collection events = check self.eventDb->getCollection("Event");
        stream<RetrieveEvent, error?> result = check events->find({});
        RetrieveEvent[] eventList = [];
        int count = 0;
        check result.forEach(function(RetrieveEvent|error event) {
            if (event is RetrieveEvent) {
                eventList.push(event);
                count += 1;
            } else {
                log:printError(string `Error processing event: ${event.message()}`, 'error = event);
            }
        });
        log:printInfo(string `Successfully retrieved ${count} events`);
        return eventList;
    }

    resource function get events/[string id]() returns RetrieveEvent|error {
        return getEventById(self.eventDb, id);
    }

    resource function post events(@http:Payload RetrieveEventInput input) returns RetrieveEvent|error {
        string id = uuid:createType1AsString();
        RetrieveEvent event = {id, ...input};
        mongodb:Collection events = check self.eventDb->getCollection("Event");
        check events->insertOne(event);
        return event;
    }

    resource function put events/[string id](@http:Payload RetrieveEventUpdate update) returns RetrieveEvent|error {
        mongodb:Collection events = check self.eventDb->getCollection("Event");
        map<json> updateFields = {};
        
        foreach var [key, value] in update.entries() {
            if value is string {
                updateFields[key] = value;
            }
        }

        mongodb:Update updateObject = {
            "$set": updateFields
        };

        mongodb:UpdateResult updateResult = check events->updateOne({id: id}, updateObject);
        
        if updateResult.modifiedCount != 1 {
            return error(string `Failed to update the event with id ${id}`);
        }
        return getEventById(self.eventDb, id);
    }

    resource function delete events/[string id]() returns string|error {
        mongodb:Collection events = check self.eventDb->getCollection("Event");
        mongodb:DeleteResult deleteResult = check events->deleteOne({id: id});
        if deleteResult.deletedCount != 1 {
            return error(string `Failed to delete the event ${id}`);
        }
        return id;
    }

    resource function get events/all() returns json[]|error {
        json[] mongoEvents = check fetchEventsFromMongoDB(self.eventDb);
        check writeEvents(mongoEvents);
        return mongoEvents;
    }
}

isolated function getEventById(mongodb:Database eventDb, string id) returns RetrieveEvent|error {
    mongodb:Collection events = check eventDb->getCollection("Event");
    stream<RetrieveEvent, error?> findResult = check events->find({id: id});
    RetrieveEvent[] result = check from RetrieveEvent e in findResult
        select e;
    if result.length() != 1 {
        return error(string `Failed to find an event with id ${id}`);
    }
    return result[0];
}

function fetchEventsFromMongoDB(mongodb:Database eventDb) returns json[]|error {
    mongodb:Collection events = check eventDb->getCollection("Event");
    stream<map<json>, error?> result = check events->find({});
    json[] eventList = [];
    check result.forEach(function(map<json>|error event) {
        if (event is map<json>) {
            eventList.push(event);
        } else {
            log:printError(string `Error processing event: ${event.message()}`, 'error = event);
        }
    });
    return eventList;
}

isolated function writeEvents(json[] events) returns error? {
    return io:fileWriteJson("./events.json", events);
}

public type RetrieveEventInput record {|
    string name;
    string description;
    string date;
    string time;
    string locationLink;
    string institute;
    string organizingCommittee;
    string tags;
    string image;
    string registrationLink;
    string resources;
|};

public type RetrieveEventUpdate record {|
    string name?;
    string description?;
    string date?;
    string time?;
    string locationLink?;
    string institute?;
    string organizingCommittee?;
    string tags?;
    string image?;
    string registrationLink?;
    string resources?;
|};

public type RetrieveEvent record {|
    readonly string id;
    *RetrieveEventInput;
|};