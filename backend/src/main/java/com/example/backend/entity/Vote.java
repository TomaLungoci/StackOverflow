package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
@Entity
@Table(name = "vote")
@Data
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type")
    private int type;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;


    @ManyToOne
    @JoinColumn(name="question_id")
    private Question question;


    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;

}
