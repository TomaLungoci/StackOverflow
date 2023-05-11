package com.example.backend.service;

import com.example.backend.entity.Tag;
import com.example.backend.entity.User;
import com.example.backend.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    @Autowired
    TagRepository tagRepository;

    public List<Tag> retrieveTags() {
        return (List<Tag>) tagRepository.findAll();
    }

    public Tag retrieveTagById(Long id) {

        Optional<Tag> tag = tagRepository.findById(id);

        if(tag.isPresent()) {
            return tag.get();
        } else {
            return null;
        }
    }

    public String deleteById(Long id){
        try{
            tagRepository.deleteById(id);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public Tag saveTag(Tag tag){
        return tagRepository.save(tag);
    }

}
