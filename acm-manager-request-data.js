//Account Creation
//Send to katie.mtech.edu/~acmuser/login
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
//Send to katie.mtech.edu/~acmuser/login
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
//Send to katie.mtech.edu/~acmuser/members
{
	"task": "GET_MEMBER_BY_ID",
	"data": {
		"id": "5"
	}
}

//Get list of officers
//end to katie.mtech.edu/~acmuser/officers

{
	"task": "GET_OFFICERS"
}
