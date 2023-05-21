package com.example.backend.repository;

import com.example.backend.entity.Question;
import com.example.backend.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
//    Page<Product> findByCategoryId(@Param("id") Long id, org.springframework.data.domain.Pageable pageable);


    Page<Question> findByTitleContaining(@Param("title") String title, Pageable pageable);
}
