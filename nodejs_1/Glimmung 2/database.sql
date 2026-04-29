CREATE DATABASE glimmung_db;
USE glimmung_db;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE gallery_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_title VARCHAR(100),
    image_url VARCHAR(255)
);

CREATE TABLE shop_links (
    shop_id INT AUTO_INCREMENT PRIMARY KEY,
    shop_name VARCHAR(100),
    shop_url VARCHAR(255)
);