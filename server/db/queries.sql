-- Top Records Page

-- Query for adding a new player and their new score:
	INSERT into Top_Records (player_name, player_score)
    VALUES
		($name, $score);

-- Query for viewing all the scores by the best to worst scores:
    SELECT * FROM Top_Records
		ORDER BY player_score DESC;

-- When a returning player plays the game and the game ends, their score is updated:
	UPDATE Top_Records
	SET player_score = $score
	WHERE player_name = $name
