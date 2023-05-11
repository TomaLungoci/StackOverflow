package com.example.backend.repository;

import com.example.backend.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.awt.print.Pageable;

@CrossOrigin("http://localhost:4200")
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
