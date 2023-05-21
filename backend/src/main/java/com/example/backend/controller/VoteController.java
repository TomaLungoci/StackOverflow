package com.example.backend.controller;

import com.example.backend.entity.Tag;
import com.example.backend.entity.Vote;
import com.example.backend.service.TagService;
import com.example.backend.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping( "/votes")
public class VoteController {

    @Autowired
    VoteService voteService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<Vote> retrieveVotes() {
        return voteService.retrieveVotes();
    }


    @GetMapping("/getByAuthorId/{id}")
    @ResponseBody
    public List<Vote> retriveByAuthorId(@PathVariable("id") Long id){
        return voteService.findBybAuthorId(id);
    }

    @PostMapping("/insertVote")
    @ResponseBody
    public Vote insertVote(@RequestBody Vote vote){
        return voteService.saveVote(vote);
    }
    @GetMapping("/findByUser/{cnp}")
    @ResponseBody
    public List<Vote> findByUser(@PathVariable("cnp") Long cnp){
        return voteService.findBybAuthorId(cnp);
    }

}
