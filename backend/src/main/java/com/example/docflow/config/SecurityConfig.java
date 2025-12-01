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
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.docflow.config.errorHandling.CustomAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Autowired
    private DocFlowUserDetailService docFlowUserDetailService;
    @Autowired
    private JWTfilter jwtfilter;
    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JWTfilter jWTfilter) throws Exception{
        http.authorizeHttpRequests(authorizeRequest-> authorizeRequest
        .requestMatchers("/api/auth/create","/api/auth/login","/api/new-password/**","/actuator/**").permitAll()
        .anyRequest().authenticated())
        .addFilterBefore(jwtfilter, UsernamePasswordAuthenticationFilter.class)
        .csrf(csrfCustomizer -> csrfCustomizer.disable())
        .cors(corsCustomizer -> {
                    corsCustomizer.configurationSource(request -> {
                        var cors = new org.springframework.web.cors.CorsConfiguration();
                        cors.setAllowedOrigins(java.util.List.of("http://localhost:5173","https://docflow.pranavtitambe.in"));
                        cors.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE","OPTIONS"));
                        cors.setAllowCredentials(true);
                        cors.setAllowedHeaders(java.util.List.of("*"));
                        return cors;
                    });
            })
        .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .exceptionHandling(exceptions-> exceptions
        .authenticationEntryPoint(customAuthenticationEntryPoint));
        return http.build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider(){  // now using this spring will authenticate the users based on email and password provided from database
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder(10));
        authenticationProvider.setUserDetailsService(docFlowUserDetailService);
        return authenticationProvider;
    }

    // This below bean will actually help us in authenticating the user using authentication provider.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception{
        return authConfig.getAuthenticationManager();
    }
    
}
