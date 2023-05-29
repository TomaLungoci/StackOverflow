package com.example.backend.controller;

import com.example.backend.entity.Question;
import com.example.backend.entity.User;
import com.example.backend.service.QuestionService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:4200")
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
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        String response = questionService.deleteById(id);

        return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"" + response +"\"}");
    }

    @PostMapping("/insertQuestion")
    @ResponseBody
    public Question insertQuestion(@RequestBody Question question){
        return questionService.saveQuestion(question);
    }

    @PutMapping("/updateQuestion")
    @ResponseBody
    public Question updateQuestion(@RequestBody Question question){
        return questionService.saveQuestion1(question);
    }

    @GetMapping("/search/{title}")
    @ResponseBody
    public List<Question> searchQuestion(@PathVariable String title) { return questionService.searchQuestion(title);}

    @GetMapping("/getQuestionByTag/{tagName}")
    @ResponseBody
    public List<Question> getQuestionByTag(@PathVariable String tagName) { return questionService.getQuestionByTag(tagName);}

    @GetMapping("/getQuestionByAuthor/{author}")
    @ResponseBody
    public List<Question> getQuestionByAuthor(@PathVariable String author) { return questionService.getQuestionByAuthor(author);}


}
