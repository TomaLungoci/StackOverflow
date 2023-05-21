USE oop2;

-- Create the "vote" table
CREATE TABLE vote (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    `like` INT NOT NULL CHECK (`like` IN (0, 1)),
    answer_id INT,
    question_id INT,
    author_cnp INT,
    FOREIGN KEY (answer_id) REFERENCES answer(id),
    FOREIGN KEY (question_id) REFERENCES question(id),
    FOREIGN KEY (author_cnp) REFERENCES user(cnp)
);