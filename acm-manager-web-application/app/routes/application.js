import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      eventTypes: [
        {
          event_type_id: 0,
          name: "Meeting",
          description: "General ACM Meeting",
          defaultPoints: 1
        },
        {
          event_type_id: 1,
          name: "Freshman Seminar",
          description: "Attend a Freshman Seminar",
          defaultPoints: 1
        },
        {
          event_type_id: 2,
          name: "Club Rush",
          description: "Help man the desk at club rush",
          defaultPoints: 1
        },
        {
          event_type_id: 3,
          name: "Programming Competition",
          description: "Attend a Programming Competition",
          defaultPoints: 0
        }
      ],
      past: [
      
      ],
      future: [
        {
          event_id: 1,
          coordinator: {
            fName: "Michael",
            lName: "Fryer",
            email: "mfryer@mtech.edu",
            userType: {
              user_type_id: 3,
              name: "Secretary",
              description: "Does secretary things."
            }
          },
          eventType: {
            event_type_id: 1,
            name: "Freshman Seminar",
            description: "Attend a Freshman Seminar",
            defaultPoints: 1
          },
          name: "Freshman Seminar",
          additionalInfo: "Talking to the freshman class about involvement in ACM",
          location: "NRB 126",
          eventTime: "2017-08-23T11:00:00",
          points: 1,
          attendance: [ ],
          fileDescription: "",
          files: [
            {
              file_id: 0,
              uploader: {
                fName: "Michael",
                lName: "Fryer",
                email: "mfryer@mtech.edu",
                userType: {
                  user_type_id: 3,
                  name: "Secretary",
                  description: "Does secretary things."
                },
              },
              audience: 0,
              fileName: "apples",
              description: "This is about apples"
            },
            {
              file_id: 1,
              uploader: {
                fName: "Michael",
                lName: "Fryer",
                email: "mfryer@mtech.edu",
                userType: {
                  user_type_id: 3,
                  name: "Secretary",
                  description: "Does secretary things."
                },
              },
              audience: 0,
              fileName: "oranges",
              description: "This is about oranges"
            }
          ]
        },
        {
          event_id: 0,
          coordinator: {
            fName: "Michael",
            lName: "Fryer",
            email: "mfryer@mtech.edu",
            userType: {
              user_type_id: 3,
              name: "Secretary",
              description: "Does secretary things."
            } 
          },
          eventType: {
            event_type_id: 0,
            name: "Meeting",
            description: "General ACM Meeting",
            defaultPoints: 1
          },
          name: "Meeting",
          additionalInfo: "",
          location: "Museum Building",
          eventTime: "2017-08-24T18:00:00",
          points: 1,
          attendance: [ ],
          fileDescription: "",
          files: [ ]
        },
        {
          event_id: 2,
          coordinator: {
            fName: "Michael",
            lName: "Fryer",
            email: "mfryer@mtech.edu",
            userType: {
              user_type_id: 3,
              name: "Secretary",
              description: "Does secretary things."
            } 
          },
          eventType: {
            event_type_id: 2,
            name: "Club Rush",
            description: "Help man the desk at club rush",
            defaultPoints: 1
          },
          name: "Club Rush",
          additionalInfo: "Help man the desk at Club Rush. One point per hour",
          location: "Quad in front of SUB",
          eventTime: "2017-08-30T10:00:00",
          points: 1,
          attendance: [ ],
          fileDescription: "",
          files: [ ]
        },
        {
          event_id: 3,
          coordinator: {
            fName: "Michael",
            lName: "Fryer",
            email: "mfryer@mtech.edu",
            userType: {
              user_type_id: 3,
              name: "Secretary",
              description: "Does secretary things."
            } 
          },
          eventType: {
            event_type_id: 3,
            name: "Programming Competition",
            description: "Attend a Programming Competition",
            defaultPoints: 0
          },
          name: "Programming Competition",
          additionalInfo: "Programming competition in Bozeman. Time TBD",
          location: "Bozeman",
          eventTime: "",
          points: 0,
          attendance: [ ],
          fileDescription: "",
          files: [ ]
        }
      ]
    };
  }
});
