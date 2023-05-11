package com.example.backend.controller;

import com.example.backend.entity.Question;
import com.example.backend.entity.User;
import com.example.backend.service.QuestionService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/questions")
public class QuestionController {
    @Autowired
    QuestionService questionService;

    @GetMapping( value = "/getAll", produces = "application/json")
    @ResponseBody
    public List<Question> retrieveQuestions() {
        return questionService.retrieveQuestions();
    }

    @GetMapping("/getQuestionById/{id}")
    @ResponseBody
    public Question getQuestionById(@PathVariable Long id) { return questionService.getQuestionById(id);}


    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public String deleteById(@PathVariable Long id){
        return questionService.deleteById(id);
    }

    @PostMapping("/insertQuestion")
    @ResponseBody
    public Question insertQuestion(@RequestBody Question question){
        return questionService.saveQuestion(question);
    }

    @PutMapping("/updateQuestion")
    @ResponseBody
    public Question updateUser(@RequestBody Question question){
        return questionService.saveQuestion(question);
    }
}
