DROP Database Game_Records;
CREATE DATABASE Game_Records;

-- Database Schema
CREATE TABLE Top_Records (
	player_id INT AUTO_INCREMENT NOT NULL,
    player_name VARCHAR(30) NOT NULL,
    player_score DECIMAL(6) NOT NULL,
    PRIMARY KEY(player_id)
);

-- Seeding Database
INSERT INTO Top_Records (player_name, player_score)
VALUES
		("Anne Hathaway", 100),
    ("Toby McGuire", 200),
    ("Jimmy Jones", 300),
    ("Adam Smith", 400,
    ("Jessica Smith", 500);
