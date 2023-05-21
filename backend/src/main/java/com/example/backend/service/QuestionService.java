package com.example.backend.service;

import com.example.backend.entity.Answer;
import com.example.backend.entity.Question;
import com.example.backend.entity.Tag;
import com.example.backend.entity.User;
import com.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;
    Pageable pageable;

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

    public void updateVotecount(Long id, int like){
        Question question = new Question();
        question = this.getQuestionById(id);
        if (like == 1){
            question.setVotecount(question.getVotecount() + 1);
        } else if (like == 0) {
            question.setVotecount(question.getVotecount() - 1);
        }
        this.saveQuestion(question);
    }
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Question does not exist")
        );
    }

    public Question saveQuestion(Question question) {
        System.out.println("saving question...");
        question.setId(null);
        return questionRepository.save(question);
    }

    public Question saveQuestion1(Question question) {
        System.out.println("editing question...");
        return questionRepository.save(question);
    }

    public List<Question> searchQuestion(String title) {
        return questionRepository.findByTitleContaining(title, pageable).getContent();
    }

    public List<Question> getQuestionByTag(String tagName){
        List<Question> allQuestions = new ArrayList<>();
        List<Question> filteredQuestions = new ArrayList<>();
        allQuestions =  this.retrieveQuestions();
        for(Question question: allQuestions){
            for(Tag tag: question.getTags()){
                if(tagName.equals(tag.getTagName())){
                    filteredQuestions.add(question);
                }
            }
        }
        return filteredQuestions;
    }

    public List<Question> getQuestionByAuthor(String author){
        List<Question> allQuestions = new ArrayList<>();
        List<Question> filteredQuestions = new ArrayList<>();
        allQuestions =  this.retrieveQuestions();
        for(Question question: allQuestions){
           if(question.getUser().getLName().equals(author)){
               filteredQuestions.add(question);
           }
        }
        return filteredQuestions;
    }

}
