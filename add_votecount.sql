SET SQL_SAFE_UPDATES = 0;



-- Add column to the "question" table
ALTER TABLE question
ADD COLUMN votecount INT DEFAULT 0;

-- Update existing records with initial value for "votecount"
UPDATE question
SET votecount = 0;

SET SQL_SAFE_UPDATES = 1;