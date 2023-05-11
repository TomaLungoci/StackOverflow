package com.example.backend.controller;

import com.example.backend.entity.Tag;
import com.example.backend.entity.User;
import com.example.backend.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {
    @Autowired
    TagService tagService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<Tag> retrieveUsers() {
        return tagService.retrieveTags();
    }


    @GetMapping("/getById/{id}")
    @ResponseBody
    public Tag retrieveById(@PathVariable("id") Long id){
        return tagService.retrieveTagById(id);
    }

    @DeleteMapping("/deleteById/{cnp}")
    @ResponseBody
    public String deleteById(@PathVariable Long id){
        return tagService.deleteById(id);
    }

    @PostMapping("/insertTag")
    @ResponseBody
    public Tag insertTag(@RequestBody Tag tag){
        return tagService.saveTag(tag);
    }
}
