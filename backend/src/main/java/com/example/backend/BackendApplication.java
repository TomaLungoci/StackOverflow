package com.example.backend;

import com.example.backend.entity.Answer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@SpringBootApplication
public class BackendApplication {



    public static void main(String[] args) throws Exception {


        SpringApplication.run(BackendApplication.class, args);

    }

}
