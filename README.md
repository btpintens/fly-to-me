# Fly To Me

![fly to me icon](./public/assets/welcome-icon.png)

## Application Description
I created Fly to Me as a way to assist the planning and execution of events: birthday parties, weddings, travel, work, etc... For people in charge of organizing these activites, the added responsiblity of having to track and facilitate travel of guests is an unnecessary nightmare. 

This app acts as an assistant to an event host; it helps them track and organize the travel of people attending their event (birthday party, camping trip, wedding shower, etc.) The host will be able to track the invitees who aren’t able to attend vs. those who are. For the guests attending the host can enter and save simple travel information: 
 - are they flying in? if so, what time are they arriving and leaving, and which airline are they using
 - are they driving? if so, what time do they expect to arrive? 
 - are they travelling by bus/train? if so, what time do they arrive and at which station? 
 
 The host can then organize those attending via arrival time and thus maintain better flow of the travel portion of the event.

## Features
- users can create individual accounts and events unique to them 
- each event is saved independently from other events: they hold specific information about time and guest count
- users can easiy add, delete, and edit the information for each guest 

## Wire Frames

### Page 1
![Initial Landing View](./public/assets/Screenshot%202025-03-31%20at%2012.15.09 PM.png)

### Page 2
![Create or Edit Page](./public/assets/Screenshot%202025-03-31%20at%2012.14.51 PM.png)

### Page 3
![Main Page](./public/assets/Screenshot%202025-03-31%20at%2012.15.25 PM.png
)
## MVP 
* As a user I want to log in and create a new event or edit/delete a current event.

* As a user I want to enter guests basic travel information and organize based on arrivals: a main page that lays out who is arriving/leaving when, and how they are getting there. (versus being organized chronologically or alphabetically).

* As a user if I need to edit my event I can easily add or remove guests, and change their travel info as needed.

* As a user, I would like to keep track of people I invited but can not attend (enter a guests name but keep them in a category separate from those that are able to attend).

## Routes
![one-to-many](./public/assets/Screenshot%202025-03-31%20at%201.21.31 PM.png)

## HTTP 
![HTTP actions](./public/assets/Screenshot%202025-03-31%20at%201.21.31 PM.png)

## __Technologies Used__
- ChatGPT (images and debugging)
- Javascript
- CSS
- EJS
- Raul

__Modules__
- Node
- Express
- Mongo / Atlas
- dotenv
- bcrypt
- method-override

## More to come....!

### __There will be a way to invite guests__ 
...and they can manage their travel information independently of the host.

Users can also organize events beyond travel coordination __there will be options for__:


_Where_ attendees are staying (and group people staying at same location)

_What_ people are wearing (weddings!)

If someone is driving to the event, do they have room for anyone else? They would be able to coordinate between themselves without busying the host.

Group _activites_: who is attending, is anyone in charge of organizing

What people are bringing: equipment, food/beverage, supplies, gear, etc.

_Cost_ associated with the activites/supplies and breakdown

### The app can be used alongside current apps (partiful, zola, etc.)

The user can include this app with their invitations to better organize and communicate travel plans

With the information provided guests/attendees can use this to plan among themselves additional travel/lodging

The platform will seamlessly provide information the guests need/want without needing the host to facilitate (ex: how many people are bringing a tent and have space for another camper; is anyone else wearing pink to the rehearsal dinner; is anyone renting a car from JFK, can i ride with you and split the cost)

![sailaway](./public/assets/corner-ship.png)