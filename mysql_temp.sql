CREATE TABLE Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(100),
  avatar_url VARCHAR(255)
);
CREATE TABLE Courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  day_of_week TINYINT,
  time_of_day INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON unihub.* TO 'admin'@'localhost';
DROP USER 'admin'@'localhost';
CREATE TABLE Assignments (
  assignment_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  user_id INT,
  description TEXT,
  due_date DATE,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE Sessions (
  session_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
ALTER TABLE Users
ADD UNIQUE KEY unique_username (username);
ALTER TABLE Courses
ADD UNIQUE KEY unique_schedule (user_id, day_of_week, time_of_day);
SHOW INDEX FROM Users;