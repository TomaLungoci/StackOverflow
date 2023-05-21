package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping( "/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<User> retrieveUsers() {
        return userService.retrieveUsers();
    }


    @GetMapping("/getById/{id}")
    @ResponseBody
    public User retrieveById(@PathVariable("id") Long cnp){
        return userService.retrieveUserById(cnp);
    }

    @DeleteMapping("/deleteById/{cnp}")
    @ResponseBody
    public String deleteById(@PathVariable Long cnp){
        return userService.deleteById(cnp);
    }

    @PostMapping("/insertUser")
    @ResponseBody
    public User insertUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @PutMapping("/updateUser")
    @ResponseBody
    public User updateUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/getByEmail/{email}")
    @ResponseBody
    public User retrieveByEmail(@PathVariable("email") String email){
        return userService.retrieveUserByEmail(email);
    }

    @PutMapping("/checkPassword")
    @ResponseBody
    public User checkPassword(@RequestBody String password) throws Exception {
        return userService.checkPassword(password);
    }




}
