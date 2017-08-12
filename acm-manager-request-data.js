/********************************************************************
 *GENERAL - Sectioned by endpoint
 ********************************************************************/
//Error
//This explains a return from a bad / problematic request.
{
  "reason": "It borked because reasons",
    .....
}

//Logged in request
//This is the general form for any request from a logged in user.
{
  "token": "asf;ljaweo;iwepoiuwerlkvdslkn",
    /* Remaining Data*/
}



/********************************************************************
 *LOGIN
 ********************************************************************/

//Account Creation
//Send to katie.mtech.edu/~acmuser/backend/login
{
  "task": "CREATE_ACCOUNT",
    "data": {
      "username": "testuser@mtech.edu",
        "password": "Password!1",
        "first":  "My First Name",
        "last": "Last Name"
    }
}

//Login
//Send to katie.mtech.edu/~acmuser/backend/login
{
  "task": "ATTEMPT_LOGIN",
    "data": {
      "username": "testuser@mtech.edu",
        "password": "Password!1"
    }
}

/********************************************************************
 *MEMBERS - Send to katie.mtech.edu/~acmuser/backend/members
 ********************************************************************/

//Get member info by id
//Log-in with officer account required (except for current user id).
{
  "task": "GET_MEMBER_BY_ID",
    "data": {
      "id": "5"
    }
}

//Get member info for all.
//Log-in with officer account required.
{
  "task": "LIST_MEMBERS",
}


/********************************************************************
 *OFFICERS - Send to katie.mtech.edu/~acmuser/backend/officers
 ********************************************************************/

//Get list of officers
{
  "task": "GET_OFFICERS"
}


/********************************************************************
 *EVENTS - Send to katie.mtech.edu/~acmuser/backend/events
 ********************************************************************/

//Get list of events w/ their files that you have permissions for.
// Permissions based on token.
{
  "task": "GET_LIST"
}

//Form for attendee data. 
//Used in creating and updating events.
var attendee = {
  "user_id": "",
  "givenPoints": "",
  "additionalInfo": ""
}

//Create an event
//Log-in with officer account required.
{
  "task": "CREATE_EVENT",
    "data": {
      "coordinator": "6",
        "eventType": "1",
        "name": "Testing Creation",
        "additionalInfo": "",
        "location": "Museum Building",
        "eventTime": "2017-07-18 18:00:00",
        "points": "1",
        "attendees": [attendee]
    }
}

//Update an event
//Log-in with officer account required.
{
  "task": "UPDATE_EVENT",
    "data": {
      "event_id": "15",
        "coordinator": "6",
        "eventType": "1",
        "name": "Testing Creation",
        "additionalInfo": "",
        "location": "Museum Building",
        "eventTime": "2017-07-18 18:00:00",
        "points": "1",
        "attendees": [attendee]
    }

}

//Delete an event
//Log-in with officer account required.
{
  "task": "DELETE_EVENT",
    "data": {
      "event_id": "13"
    }
}


///EVENT TYPES///

//Create Event Type
//Log-in with officer account required.
{
"task": "CREATE_EVENT_TYPE",
    "data": {
        "name": "New Event Type Name",
        "description": "A general idea",
        "defaultPoints": "1"
    }
}

//Update Event Type
//Log-in with officer account required.
{
"task": "UPDATE_EVENT_TYPE",
    "data": {
      "event_type_id": "13",
        "name": "Updated",
        "description": "A general idea",
        "defaultPoints": "1"
    }
}

//Delete Event Type
//Log-in with officer account required.
{
"task": "DELETE_EVENT_TYPE",
    "data": {
      "event_type_id": "13",
    }
}

/********************************************************************
 *FILES
 ********************************************************************/


/********************************************************************
 *FEES - Send to katie.mtech.edu/~acmuser/backend/fees
 ********************************************************************/
//Get a list of fees given a user id.
//Log-in with officer account required (except for current user id).
{
  "task": "GET_FEES_BY_MEMBER",
    "data": {
      "user_id": "5"
    }
}

//Get a list of fees for everyone.
//Log-in with officer account required
{
  "task": "GET_ALL_FEES"
}

/********************************************************************
 * METADATA - Send to katie.mtech.edu/~acmuser/backend/metadata
 ********************************************************************/

{
  "task": "GET_METADATA"
    "data": {
      "endpoint": ""
    }
}


