package com.cognizant.billing.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillingController {

    @GetMapping("/billing")
    public String getBilling() {
        return "Billing Service";
    }
}