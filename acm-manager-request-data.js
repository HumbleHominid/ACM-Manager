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

//Get member info by id
//Send to katie.mtech.edu/~acmuser/backend/members
{
   "task": "GET_MEMBER_BY_ID",
   "data": {
      "id": "5"
   }
}

//Get member info for all.
//Send to katie.mtech.edu/~acmuser/backend/members
{
   "task": "LIST_MEMBERS",
}

//Get list of officers
//end to katie.mtech.edu/~acmuser/backend/officers

{
   "task": "GET_OFFICERS"
}

//Get list of events w/ their files that you have permissions for.
// Permissions based on token.
// Send to katie.mtech.edu/~acmuser/backend/events
{
   "task": "GET_LIST"
}

//Get a list of fees given a user id.
//Send to katie.mtech.edu/~acmuser/backend/fees
{
   "task": "GET_FEES_BY_MEMBER",
   "data": {
      "user_id": "5"
   }
}

//Get a list of fees for everyone.
//Send to katie.mtech.edu/~acmuser/backend/fees
{
   "task": "GET_ALL_FEES"
}
