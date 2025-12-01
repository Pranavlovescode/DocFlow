package com.example.docflow;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldLoginWithValidCredentials() throws Exception {

        // Signup first
        String signupJson = """
            {
                "email": "newuser@gmail.com",
                "password": "secret123",
                "name": "New User"
            }
        """;

        mockMvc.perform(post("/api/user/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(signupJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("newuser@gmail.com"))
                .andExpect(jsonPath("$.name").value("New User"));

        // Attempt login
        String loginJson = """
            {
                "email": "newuser@gmail.com",
                "password": "secret123"
            }
        """;

        mockMvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("newuser@gmail.com"));
    }

}

