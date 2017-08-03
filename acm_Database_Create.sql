USE tbrooks;

DELETE FROM Metadata;
DROP TABLE IF EXISTS Metadata;

DELETE FROM Announcements;
DROP TABLE IF EXISTS Announcements;

DELETE FROM User_Attendance;
DROP TABLE IF EXISTS User_Attendance;

DELETE FROM Event_Files;
DROP TABLE IF EXISTS Event_Files;

DELETE FROM Files;
DROP TABLE IF EXISTS Files;

DELETE FROM Events;
DROP TABLE IF EXISTS Events;

DELETE FROM Debtor_Fees;
DROP TABLE IF EXISTS Debtor_Fees;

DELETE FROM Fees;
DROP TABLE IF EXISTS Fees;

DELETE FROM Fee_Type;
DROP TABLE IF EXISTS Fee_Type;

DELETE FROM Users;
DROP TABLE IF EXISTS Users;

DELETE FROM Event_Type;
DROP TABLE IF EXISTS Event_Type;

DELETE FROM User_Type;
DROP TABLE IF EXISTS User_Type;

DELETE FROM Passwords;
DROP TABLE IF EXISTS Passwords;


CREATE TABLE Passwords (
  password_id int NOT NULL AUTO_INCREMENT,
  password varchar(255) NOT NULL,
  passwordTimeout datetime,
  verificationCode varchar(8),
  PRIMARY KEY(password_id)
);

CREATE TABLE User_Type (
  user_type_id tinyint NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  description varchar(50),
  PRIMARY KEY(user_type_id)
);

CREATE TABLE Event_Type (
  event_type_id tinyint NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  description varchar(50),
  defaultPoints double,
  PRIMARY KEY(event_type_id)
);

CREATE TABLE Users (
  user_id int NOT NULL AUTO_INCREMENT,
  password_id int NOT NULL,
  user_type tinyint NOT NULL,
  fName varchar(20) NOT NULL,
  lName varchar(20) NOT NULL,
  email varchar(30) NOT NULL UNIQUE,
  points double,
  FOREIGN KEY(password_id) REFERENCES Passwords(password_id),
  FOREIGN KEY(user_type) REFERENCES User_Type(user_type_id),
  PRIMARY KEY(user_id)
);

CREATE TABLE Fee_Type (
	fee_type_id tinyint NOT NULL AUTO_INCREMENT,
	name varchar(20) NOT NULL,
	description varchar(50),
	PRIMARY KEY(fee_type_id)
);

CREATE TABLE Fees (
  fee_id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  description varchar(140) NOT NULL,
  dueDate timestamp,
  fee double, 
  fee_type_id tinyint NOT NULL,
  FOREIGN KEY(fee_type_id) REFERENCES Fee_Type(fee_type_id),
  PRIMARY KEY(fee_id)
);

CREATE TABLE Debtor_Fees (
  debtor_id int NOT NULL,
  fee_id int NOT NULL,
  additionalInfo varchar(140),
  paid bit,
  FOREIGN KEY(debtor_id) REFERENCES Users(user_id),
  FOREIGN KEY(fee_id) REFERENCES Fees(fee_id),
  PRIMARY KEY(debtor_id, fee_id)
);

CREATE TABLE Events (
  event_id int NOT NULL AUTO_INCREMENT,
  coordinator int NOT NULL,
  eventType tinyint NOT NULL,
  name varchar(30) NOT NULL,
  additionalInfo text,
  location varchar(50),
  eventTime timestamp NOT NULL,
  points double NOT NULL,
  FOREIGN KEY(coordinator) REFERENCES Users(user_id),
  FOREIGN KEY(eventType) REFERENCES Event_Type(event_type_id),
  PRIMARY KEY(event_id)
);

CREATE TABLE Files (
  file_id int NOT NULL AUTO_INCREMENT,
  uploader int NOT NULL,
  audience tinyint NOT NULL,
  fileName varchar(30) NOT NULL,
  description varchar(255),
  FOREIGN KEY(uploader) REFERENCES Users(user_id),
  FOREIGN KEY(audience) REFERENCES User_Type(user_type_id),
  PRIMARY KEY(file_id)
);

CREATE TABLE Event_Files (
  event_id int NOT NULL,
  file_id int NOT NULL,
  additionalInfo varchar(50),
  FOREIGN KEY(event_id) REFERENCES Events(event_id),
  FOREIGN KEY(file_id) REFERENCES Files(file_id),
  PRIMARY KEY(event_id, file_id)
);

CREATE TABLE User_Attendance (
	user_id int NOT NULL,
	event_id int NOT NULL,
	givenPoints double,
	additionalInfo varchar(30),
	FOREIGN KEY(user_id) REFERENCES Users(user_id),
	FOREIGN KEY(event_id) REFERENCES Events(event_id)
);

CREATE TABLE Metadata(
  endpoint VARCHAR(20),
  updateTime DATETIME
);

CREATE TABLE Announcements(
anno_id INT NOT NULL AUTO_INCREMENT, 
message VARCHAR(140) NOT NULL,
startTime DATETIME NOT NULL,
endTime DATETIME NOT NULL,
user_type tinyint NOT NULL,
creator_id int NOT NULL,
FOREIGN KEY(user_type) REFERENCES User_Type(user_type_id),
FOREIGN KEY (creator_id) REFERENCES Users(user_id),
PRIMARY KEY(anno_id)
);
