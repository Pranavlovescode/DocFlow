package com.example.docflow.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Autowired
    private DocFlowUserDetailService docFlowUserDetailService;
    @Autowired
    private JwtConfig jwtconfig;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JWTfilter jWTfilter) throws Exception{
        http.authorizeHttpRequests(authorizeRequest-> authorizeRequest
        .requestMatchers("/api/create/user","/api/user/login").permitAll()
        .anyRequest().authenticated())
        .addFilterBefore(jWTfilter, UsernamePasswordAuthenticationFilter.class)
        .csrf(csrfCustomizer -> csrfCustomizer.disable())
        .cors(corsCustomizer -> {
                    corsCustomizer.configurationSource(request -> {
                        var cors = new org.springframework.web.cors.CorsConfiguration();
                        cors.setAllowedOrigins(java.util.List.of("http://localhost:5173"));
                        cors.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE"));
                        cors.setAllowCredentials(true);
                        cors.setAllowedHeaders(java.util.List.of("*"));
                        return cors;
                    });
            })
        .httpBasic(org.springframework.security.config.Customizer.withDefaults());
        return http.build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider(){  // now using this spring will authenticate the users based on email and password provided from database
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder(10));
        authenticationProvider.setUserDetailsService(docFlowUserDetailService);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception{
        return authConfig.getAuthenticationManager();
    }
}
