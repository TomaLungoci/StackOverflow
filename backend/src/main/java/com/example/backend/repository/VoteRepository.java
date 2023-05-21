package com.example.backend.repository;

import com.example.backend.entity.Answer;
import com.example.backend.entity.User;
import com.example.backend.entity.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Page<Vote> findByUserCnp(@Param("id") Long id, Pageable pageable);

}
