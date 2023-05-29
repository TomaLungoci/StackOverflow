package com.example.backend.controller;

import com.example.backend.entity.Answer;
import com.example.backend.entity.Question;
import com.example.backend.service.AnswerService;
import com.example.backend.service.QuestionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Transactional
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping( "/answers")
public class AnswerController {
    @Autowired
    AnswerService answerService;

    @GetMapping( value = "/getAll", produces = "application/json")
    @ResponseBody
    public List<Answer> retrieveAnswers() {
        return answerService.retrieveAnswers();
    }

    @PostMapping("/insertAnswer")
    @ResponseBody
    public Answer insertAnswer(@RequestBody Answer answer){
        return answerService.saveAnswer(answer);
    }

    @GetMapping("/search/{id}")
    @ResponseBody
    public List<Answer> searchQuestion(@PathVariable Long id) { return answerService.getQuestionAnswers(id);}

    @PutMapping("/updateAnswer")
    @ResponseBody
    public Answer updateAnswer(@RequestBody Answer answer){
        return answerService.saveAnswer1(answer);
    }


    @GetMapping("/getAnswerById/{id}")
    @ResponseBody
    public Answer getQuestionById(@PathVariable Long id) { return answerService.getAnswerById(id);}



}
