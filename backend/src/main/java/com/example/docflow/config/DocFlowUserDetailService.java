package com.example.docflow.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.docflow.entity.User;
import com.example.docflow.entity.UserPrinciple;
import com.example.docflow.repo.UserRepo;

@Service
public class DocFlowUserDetailService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("The email entered is not found");
        }
        System.out.println("Fetched user: " + user.getEmail());
        System.out.println("Stored (hashed) password: " + user.getPassword());
        return new UserPrinciple(user);
    }

}
