CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;

CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL ,
    description VARCHAR(255) NOT NULL,
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_time DATETIME NOT NULL,
    status ENUM ('not started', 'to do', 'in prgress', 'done') DEFAULT 'not started',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) PREFERENCE user(id)
);
