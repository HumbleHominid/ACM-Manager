CREATE TABLE Passwords (
  password_id int NOT NULL AUTO_INCREMENT,
  password varchar(255) NOT NULL,
  pjsalt varchar(113) NOT NULL,
  PRIMARY KEY(password_id)
);

CREATE TABLE User_Type (
  user_type_id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  description varchar(50),
  PRIMARY KEY(user_type_id)
);

CREATE TABLE Event_Type (
  event_type_id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  description varchar(50),
  PRIMARY KEY(event_type_id)
);

CREATE TABLE Users (
  user_id int NOT NULL AUTO_INCREMENT,
  password_id int NOT NULL,
  user_type int NOT NULL,
  fName varchar(20) NOT NULL,
  lName varchar(20) NOT NULL,
  email varchar(30) NOT NULL,
  FOREIGN KEY(password_id) REFERENCES Passwords(password_id),
  FOREIGN KEY(user_type) REFERENCES User_Type(user_type_id),
  PRIMARY KEY(user_id)
);

CREATE TABLE Files (
  file_id int NOT NULL AUTO_INCREMENT,
  uploader int NOT NULL,
  audience int NOT NULL,
  fileName varchar(30) NOT NULL,
  description varchar(255),
  FOREIGN KEY(uploader) REFERENCES Users(user_id),
  FOREIGN KEY(audience) REFERENCES User_Type(user_type_id),
  PRIMARY KEY(file_id)
);

CREATE TABLE Events (
  event_id int NOT NULL AUTO_INCREMENT,
  coordinator int NOT NULL,
  EventType int NOT NULL,
  name varchar(30) NOT NULL,
  additionalInfo text,
  location varchar(50),
  time timestamp NOT NULL,
  attendance int NOT NULL,
  FOREIGN KEY(coordinator) REFERENCES Users(user_id),
  FOREIGN KEY(eventType) REFERENCES Event_Type(event_type_id),
  PRIMARY KEY(event_id)
);

CREATE TABLE Event_Files (
  event_id int NOT NULL,
  file_id int NOT NULL,
  additonalInfo varchar(50),
  FOREIGN KEY(event_id) REFERENCES Events(event_id),
  FOREIGN KEY(file_id) REFERENCES Files(file_id),
  PRIMARY KEY(event_id, file_id)
);

CREATE TABLE Fees (
  fee_id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  description varchar(140) NOT NULL,
  dueDate timestamp,
  PRIMARY KEY(fee_id)
);

CREATE TABLE Debtor_Fees (
  debtor_id int NOT NULL,
  fee_id int NOT NULL,
  additionalInfo varchar(140),
  FOREIGN KEY(debtor_id) REFERENCES Users(user_id),
  FOREIGN KEY(fee_id) REFERENCES Fees(fee_id),
  PRIMARY KEY(debtor_id, fee_id)
);
