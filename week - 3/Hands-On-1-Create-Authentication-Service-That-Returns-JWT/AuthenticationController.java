package com.cognizant.springlearn.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    private static final SecretKey KEY = Keys.hmacShaKeyFor(
            "mySecretKeyForJwtGenerationMustBeLongEnough123456".getBytes());

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(java.security.Principal principal) {
        LOGGER.info("Start");
        String username = principal.getName();

        String token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 20 * 60 * 1000))
                .signWith(KEY)
                .compact();

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        LOGGER.info("End");
        return response;
    }
}