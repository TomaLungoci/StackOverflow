package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.HashSet;

@Entity
@Table(name = "answer")
@Data
public class Answer implements Comparable<Answer>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;


    @Column(name = "answer_text")
    private String answerText;


    @Column(name = "image_url")
    private String imageUrl;


    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    @ManyToOne
    @JoinColumn(name="question_id", nullable=false)
    private Question question;

    @Column(name = "votecount")
    private Integer votecount;

    @Override
    public int compareTo(Answer o) {
        return -this.votecount.compareTo(o.getVotecount());
    }
}
