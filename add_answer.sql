USE oop2;

CREATE TABLE answer (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  answer_text VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  date_created DATETIME(6) DEFAULT NULL,
  last_updated DATETIME(6) DEFAULT NULL,
  author_id INT NOT NULL,
  question_id INT NOT NULL,
  CONSTRAINT fk_author_answer FOREIGN KEY (author_id) REFERENCES user (cnp),
  CONSTRAINT fk_question_answer FOREIGN KEY (question_id) REFERENCES question (id)
);