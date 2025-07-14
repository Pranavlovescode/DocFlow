package com.example.docflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.docflow.entity.User;
import com.example.docflow.services.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UserController {

    @Autowired
    UserService userService;
    
    @PostMapping("/api/user/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        
        return ResponseEntity.ok().body(userService.createUserService(user));
    }
    
}
