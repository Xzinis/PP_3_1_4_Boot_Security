package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserDetailServic;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;
    private final RoleService roleService;
    private final UserDetailServic userDetailService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService, UserDetailServic userDetailService) {
        this.userService = userService;
        this.roleService = roleService;
        this.userDetailService = userDetailService;
    }

        @GetMapping("/admin")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleService.findAll();
    }

    @PostMapping("/admin")
    public void addNewUser(@RequestBody User user) {
        userService.save(user);
    }

    @PutMapping("/admin")
    public void update(@RequestBody User user) {
        userService.update(user);

    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable("id") long id) {
        userService.deleteById(id);
    }
}
