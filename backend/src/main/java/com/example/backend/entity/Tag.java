package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tag")
@Data
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "tag_name")
    private String tagName;

    @ManyToMany(mappedBy = "tags")
    private Set<Question> questions;

    public Tag() {
    }

    public Tag(Long id, String tagName) {
        this.id = id;
        this.tagName = tagName;
    }

    public void add(Question question){
        if(question != null){
            if(questions == null){
                questions = new HashSet<>();
            }
            questions.add(question);
            question.getTags().add(this);
        }
    }

}
