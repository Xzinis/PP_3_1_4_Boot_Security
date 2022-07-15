package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserDetailServic;


import java.security.Principal;

@RestController
@RequestMapping("/api")
public class UserRestController {
    private final UserDetailServic userDetailService;

    @Autowired
    public UserRestController(UserDetailServic userDetailService) {
        this.userDetailService = userDetailService;
    }

    @GetMapping("/user")
    public User getUserById(Principal principal){
        return userDetailService.findByEmail(principal.getName());
    }
}
