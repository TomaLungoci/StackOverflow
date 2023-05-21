package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @Column(name = "cnp")
    private Long cnp;

    @Column(name = "l_name")
    private String lName;

    @Column(name = "f_name")
    private String fName;

    @Column(name = "e_mail")
    private String eMail;

    @Column(name = "password")
    private String password;

    public User(){

    }

    public User(Long cnp, String lName, String fName, String email) {
        this.cnp = cnp;
        this.lName = lName;
        this.fName = fName;
        this.eMail = email;
    }
}
