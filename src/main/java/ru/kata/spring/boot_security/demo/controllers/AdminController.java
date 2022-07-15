package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserDetailServic;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    private final UserDetailServic userDetailService;

    public AdminController(UserService userService, RoleService roleService, UserDetailServic userDetailService) {
        this.userService = userService;
        this.roleService = roleService;
        this.userDetailService = userDetailService;
    }

    @GetMapping
    public String userList(Model model, Principal principal) {
        List<User> list = userService.findAll();
        List<Role> listRoles = roleService.findAll();
        model.addAttribute("userList", list);
        model.addAttribute("listRoles", listRoles);
        model.addAttribute("userNew", new User());
        model.addAttribute("userGet", userDetailService.findByEmail(principal.getName()));;
        return "admin";
    }

    @PostMapping("/new")
    public String newUser(@ModelAttribute("user") User user) {
        userService.save(user);
        return ("redirect:/admin");
    }

    @GetMapping("/{id}/edit")
    public String edit(Model model, @PathVariable("id") long id) {
        User editUser = userService.findOne(id);
        model.addAttribute("allRoles", roleService.findAll());
        model.addAttribute("user", editUser);
        return "admin";
    }

    @PatchMapping("{id}")
    public String update(@ModelAttribute("user") User user,
                         @PathVariable("id") Long id) {
        userService.update(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }
}

