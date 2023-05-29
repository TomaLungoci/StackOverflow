package com.example.backend.service;

import com.example.backend.entity.Answer;
import com.example.backend.entity.Question;
import com.example.backend.repository.AnswerRepository;
import com.example.backend.repository.QuestionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class AnswerService {

    @Autowired
    AnswerRepository answerRepository;
    @Autowired
    QuestionRepository questionRepository;
    Pageable pageable;



    public List<Answer> retrieveAnswers() {
        return (List<Answer>) answerRepository.findAll();
    }


    public String deleteById(Long id) {
        try {
            answerRepository.deleteById(id);
            return "Success";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed";
        }
    }

    public Answer getAnswerById(Long id) {
        return answerRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Question does not exist")
        );
    }

    public void updateVotecount(Long id, int like){
        Answer answer = new Answer();
        answer = this.getAnswerById(id);
        if (like == 1){
            answer.setVotecount(answer.getVotecount() + 1);
        } else if (like == 0) {
            answer.setVotecount(answer.getVotecount() - 1);
        }
        this.saveAnswer(answer);
    }

    public Answer saveAnswer(Answer answer) {
        System.out.println("saving question...");
        Optional<Question> q = questionRepository.findById(answer.getQuestion().getId());
        Question question = q.get();
        question.addAnswer(answer);
        answer.setId(null);
        return answerRepository.save(answer);
    }

    public Answer saveAnswer1(Answer answer) {
        System.out.println("saving question...");
        Optional<Question> q = questionRepository.findById(answer.getQuestion().getId());
        Question question = q.get();
        question.addAnswer(answer);
        //answer.setId(null);
        return answerRepository.save(answer);
    }

    public List<Answer> getQuestionAnswers(Long id){
        List<Answer> answers = new ArrayList<>();
        for(Answer answer: (List<Answer>) answerRepository.findByQuestionId(id, pageable).getContent()){
            answers.add(answer);
        }
        if(answers != null || answers.size() == 0){
            Collections.sort(answers);
        }
        return answers;
    }
}
