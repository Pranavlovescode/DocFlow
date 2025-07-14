package com.example.docflow.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.docflow.entity.User;
import com.example.docflow.repo.UserRepo;

@Service
public class UserService {


    @Autowired
    UserRepo userRepo;
    
    public User createUserService(User user){
        return userRepo.save(user);
    }
}
