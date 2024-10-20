# EventUni

EventUni is an innovative event management platform specifically designed for Sri Lankan universities and institutes. It offers a centralized space where students, faculty members, and other individuals can easily browse and create events, helping everyone stay connected with what's happening on campus.

## Table of Contents
- [Introduction](#introduction)
- [Key Problem](#key-problem)
- [Solution](#solution)
- [Demo](#demo)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)

## Introduction
Hello and welcome! EventUni is an event management platform tailored for Sri Lankan universities and institutes. As university students ourselves, we've experienced a common issue: the way events are communicated is often disorganized, leading to missed opportunities for students. 

EventUni aims to solve this problem by offering a unified platform where event information is centralized and easily accessible.

## Key Problem
The main issue we're addressing with EventUni is the lack of a centralized and reliable space where all university events can be found. Currently, event details are scattered across multiple platforms like WhatsApp groups, statuses, and social media channels, leading to confusion and fragmented communication.

## Solution
EventUni provides a single, unified platform that centralizes event information, making it easy for students, faculty members, and other individuals to browse and create events. The platform streamlines the way events are organized and communicated, ensuring that no one misses out on exciting or valuable events.

## Demo
Here's a quick overview of how EventUni works:

### Technical Overview
- **Frontend**: Built with a React + Vite app for a fast and responsive user interface.
- **Styling**: Utilizes Tailwind CSS for a clean and adaptable UI.
- **Backend**: Uses Ballerina to handle data flow and interactions with MongoDB.
- **Authentication**: Powered by Firebase, allowing Google and email-based logins.
- **Database**: MongoDB handles CRUD operations for events and user bookings.

### Core Features
- **Event Creation and Management**: Users can create, update, and delete events.
- **Event Enrollment and Tickets**: Participants can register and purchase tickets.
- **Tag-Based Search**: Filter events by categories like ‘workshop’, ‘competition’, or ‘festival’.
- **Booking Dashboard**: Users can view and manage their booked or registered events.
- **Admin Dashboard**: Admins can review and manage requests for event creator access.
- **Search Function**: Quickly filter events using tags or categories.

## Technology Stack
EventUni is built using the following technologies:
- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Ballerina, MongoDB
- **Authentication**: Firebase
- **Additional Libraries**:
  - AOS (smooth animations)
  - Axios (API requests)
  - Framer Motion (dynamic UI interactions)
  - Sweet Alert (notifications)
  - Lucide React (icons)

## Getting Started
To get a local copy up and running, follow these simple steps:

### Prerequisites
- Node.js and npm installed
- MongoDB database setup
- Firebase account for authentication

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nethmalgunawardhana/iwb124-the-404s.git
2. Navigate to the project directory:
   ```bash
   cd Frontend
3. Install dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm run dev
   
#### MongoDB Setup

1. Start the MongoDB server (make sure MongoDB is installed on your machine):
   ```bash
   mongod
2. Open another terminal window and start the MongoDB shell:
   ```bash
   mongo
3. Create a new database for EventUni:
   ```bash
   use EventDb
4. Create the necessary collections for the database:
   ```bash
   db.createCollection("Event")
   db.createCollection("Booking")
   db.createCollection("AdminAccess")
   
#### Ballerina Setup

1. Navigate to the backend directory in your project:
   ```bash
   cd Backend
2. Run the Ballerina service:
   ```bash
   bal run

This command will start the Ballerina server, which handles all data transactions and communicates with the MongoDB database.
