package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.*;

@Entity
@Table(name = "question")
@Data
public class Question implements Comparable<Question>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;

    @Column(name = "title")
    private String title;

    @Column(name = "question_text")
    private String questionText;


    @Column(name = "image_url")
    private String imageUrl;


    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    @ManyToMany()
    @JoinTable(
            name = "question_tag",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private Set<Answer> answers;

    @Column(name = "votecount")
    private Integer votecount;

    public void add(Tag tag){
        if(tag != null){
            if(tags == null){
                tags = new HashSet<>();
            }
            tags.add(tag);
            tag.getQuestions().add(this);
        }
    }

    public void addAnswer(Answer answer){
        if(answer != null){
            if(answers == null){
                answers = new HashSet<>();
            }
            answers.add(answer);
        }
    }

    @Override
    public int compareTo(Question o) {
        if(this.lastUpdated.after(o.getLastUpdated())){
            return -1;
        }else{
            return 1;
        }
    }
}
