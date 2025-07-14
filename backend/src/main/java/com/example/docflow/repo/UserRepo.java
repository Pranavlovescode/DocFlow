package com.example.docflow.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.docflow.entity.User;

public interface UserRepo extends MongoRepository<User,String> {
    User findByEmail(String email);
}
