package com.example.docflow.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.docflow.config.JwtConfig;
import com.example.docflow.entity.User;
import com.example.docflow.repo.UserRepo;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtConfig jwt;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    public User createUserService(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public String loginUser(User user) {
        System.out.println(user.getEmail());
        System.out.println(user.getPassword());
        Authentication auth = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        System.out.println("Authentication obj " + auth);
        if (auth.isAuthenticated())
            return jwt.generateToken(user.getEmail());
        return "Email or Password Invalid";
    }

    public String updatePassword(User user) {
        System.out.println("Received new password: " + user.getPassword());
        System.out.println("Encoded password: " + passwordEncoder.encode(user.getPassword()));

        User existingUser = userRepo.findByEmail(user.getEmail());
        if (existingUser == null)
            return "No user found with " + user.getEmail() + " email";
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(existingUser);
        System.out.println("Stored password "+ existingUser.getPassword());
        return "New password set successfully";
    }
}
