//User type object
var userTypeObj = {
  user_type_id: 0,
  name: "",
  description: ""
}

//This is the user obj that is returned with every request
var appUserObj = {
  fName: "",
  lName: "",
  email: "",
  userType: userTypeObj,
  user_id: 0, /* Please */
  jwt: ""
}

//This is a user in the application, other than who is logged in
//Note this doesn't have user_id or a jwt
var userObj = {
  fName: "",
  lName: "",
  email: "",
  userType: userTypeObj
}

//Return data for officers
var officerObj = {
  user: appUserObj,
  president: userObj,
  vicePresident: userObj,
  secretary: userObj,
  treasurer: userObj
}

//Return data for login get request
var loginObj = {
  user: appUserObj
}

//Return data for a file
var fileObj = {
  file_id: 0,
  uploader: userObj,
  audience: 0,
  fileName: "",
  description: ""
}

var eventTypeObj = {
  event_type_id: 0,
  name: "",
  description: "",
  defaultPoints: 0
}

//Return data for events get request
var eventObj = {
  user: appUserObj,
  eventTypes: [
    eventTypeObj
  ],
  data: {
    past: [
      {
        event_id: 0,
        //replaced using users table
        coordinator: userObj,
        
        //replaced using event type table
        eventType: eventTypeObj,
        name: "",
        additionalInfo: "",
        location: "",
        eventTime: "",
        points: 0,
        attendance: {
          amount: 0,
          attendees: [
            userObj
          ]
        },
        
        //Only return files that the user can see.
        files: [
          {
            file: fileObj,
            additionalInfo: ""
          }
        ]
      }
    ],
    future: [
      {
        event_id: 0,
        
        //replaced using users table
        coordinator: userObj,
        
        //replaced using event type table
        eventType: eventTypeObj,
        name: "",
        additionalInfo: "",
        location: "",
        eventTime: "",
        points: 0,
        attendance: {
          amount: 0,
          attendees: [
            userObj
          ]
        },
        
        //Only return files that the user can see.
        files: [
          {
            file: fileObj,
            additionalInfo: ""
          }
        ]
      }
    ]
  }
}

//Data structure for a fee-type object
var feeTypeObj = {
  fee_type_id: 0,
  name: "",
  description: ""
}

//Data structure for a fee object
var feeObj = {
  fee_id: 0,
  name: "",
  description: "",
  dueDate: "",
  fee: 0,
  feeType: feeTypeObj
}

//Return data for a set of fees
var feesObj = {
  user: appUserObj,
  feeTypes: [
    feeObj
  ],
  debtors: [
    {
      user: userObj,
      fees: [
        {
          fee: feeObj,
          additionalInfo: "",
          paid: false
        }
      ]
    }
  ]
}
