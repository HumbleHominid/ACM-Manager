-- User Type data.
INSERT INTO User_Type (name, description)
VALUES ('Member', 'Club Member');

INSERT INTO User_Type (name, description)
VALUES ('Treasurer', 'Treasurer');

INSERT INTO User_Type (name, description)
VALUES ('Secretary', 'Secretary');

INSERT INTO User_Type (name, description)
VALUES ('Vice President', 'Vice President');

INSERT INTO User_Type (name, description)
VALUES ('President', 'President');

INSERT INTO User_Type (name, description)
VALUES ('Advisor', 'Faculty Advisor');

INSERT INTO User_Type (name, description)
VALUES ('Visitor', 'General visitor to app.');

UPDATE User_Type SET user_type_id = 0 WHERE name = 'Visitor';


-- Fee type samples
INSERT INTO Fee_Type (name, description)
VALUES ('Dues', 'Yearly dues. $10');

INSERT INTO Fee_Type (name, description)
VALUES ('T-Shirt', 'Yearly T-shirt');

INSERT INTO Fee_Type (name, description)
VALUES ('Pizza', 'Money for pizza');


-- Event Type samples.

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('Meeting', 'General club meetings for all members', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('LAN Party', 'LAN Party, games, and pizza', 0);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('Programming Comp', 'Programming competitions', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('Programming Prac', 'Practice for competitions', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('Industry Trip', 'Going out and seeing companies', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('Homecoming', 'Attendance for Homecoming events', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('Club Rush', 'Club Rush help', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('ASMT Meeting', 'Attendance for an ASMT proposal meeting', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('DnD Night', 'Dungeons and Dragons game night', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('Board Meeting', 'Board Meeting for Officers', 1);

INSERT INTO Event_Type (name, description, defaultPoints)
VALUES ('Study Group', 'Time for students to help each other with homework', 1);


-- Metadata for endpoints.
INSERT INTO Metadata(endpoint, updateTime) VALUES ('Events', NOW());
INSERT INTO Metadata(endpoint, updateTime) VALUES ('Login', NOW());
INSERT INTO Metadata(endpoint, updateTime) VALUES ('Members', NOW());
INSERT INTO Metadata(endpoint, updateTime) VALUES ('Fees', NOW());
INSERT INTO Metadata(endpoint, updateTime) VALUES ('Officers', NOW());
INSERT INTO Metadata(endpoint, updateTime) VALUES ('Files', NOW());
INSERT INTO Metadata(endpoint, updateTime) VALUES ('Announcements', NOW());
