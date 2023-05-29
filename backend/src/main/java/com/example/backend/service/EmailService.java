package com.example.backend.service;

import com.example.backend.entity.EmailDetails;

public interface EmailService {

    String sendSimpleMail(EmailDetails details);


}
