package com.example.backend.service;

import com.example.backend.entity.Question;
import com.example.backend.entity.User;
import com.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    public List<Question> retrieveQuestions() {
        return (List<Question>) questionRepository.findAll();
    }


    public String deleteById(Long id) {
        try {
            questionRepository.deleteById(id);
            return "Success";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed";
        }
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Question does not exist")
        );
    }

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }
}
