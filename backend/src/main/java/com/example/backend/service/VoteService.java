package com.example.backend.service;

import com.example.backend.entity.Tag;
import com.example.backend.entity.User;
import com.example.backend.entity.Vote;
import com.example.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class VoteService {

    @Autowired
    VoteRepository voteRepository;
    @Autowired
    UserService userService;
//    @Autowired
//    AnswerRepository answerRepository;
//    @Autowired
//    QuestionRepository questionRepository;
    Pageable pageable;
//    QuestionService questionService = new QuestionService();
//    AnswerService answerService = new AnswerService();

    public List<Vote> retrieveVotes() {
        return (List<Vote>) voteRepository.findAll();
    }

    public List<Vote> findBybAuthorId(Long cnp){
        return voteRepository.findByUserCnp(cnp, pageable).getContent();
    }

    public Vote saveVote(Vote vote){
        Long authorId = vote.getUser().getCnp();
        List<Vote> authorVotes = new ArrayList<>();
        authorVotes = this.findBybAuthorId(authorId);
        boolean alreadyVoted = false;
        for(Vote vote1: authorVotes){
            if(vote.getAnswer() != null){
                if(vote1.getAnswer() != null){
                    if(vote1.getAnswer().getId() == vote.getAnswer().getId()){
                        alreadyVoted = true;
                    }
                }
            }
            if(vote.getQuestion() != null){
                if(vote1.getQuestion() != null){
                    if(vote1.getQuestion().getId() == vote.getQuestion().getId()){
                        alreadyVoted = true;
                    }
                }
            }
        }
        if(!alreadyVoted){
//            if(vote.getQuestion() != null){
//                questionService.updateVotecount(vote.getQuestion().getId(), vote.getLike());
//            }else if(vote.getAnswer() != null){
//                answerService.updateVotecount(vote.getAnswer().getId(), vote.getLike());
//            }
            if(vote.getQuestion() != null){
                User user = vote.getQuestion().getUser();
                if(vote.getType() == 1){
                    user.setScore(user.getScore() + 2.5);
                    userService.saveUser(user);
                }else{
                    user.setScore(user.getScore() - 1.5);
                    userService.saveUser(user);
                }
            }
            if(vote.getAnswer() != null){
                User user = vote.getAnswer().getUser();
                if(vote.getType() == 1){
                    user.setScore(user.getScore() + 5);
                    userService.saveUser(user);
                }else{
                    user.setScore(user.getScore()- 2.5);
                    userService.saveUser(user);
                    User authorOfDislike = vote.getUser();
                    authorOfDislike.setScore(authorOfDislike.getScore() - 1.5);
                    userService.saveUser(authorOfDislike);
                }
            }
            return voteRepository.save(vote);
        }
        return null;
    }
}
