package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.service.UserServiceImp;
import javax.validation.Valid;



@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserServiceImp userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String index(Model model) {
        model.addAttribute("users", userService.findAll());
        return "users/admin/index";
    }

    @GetMapping("/{id}")
    public String show(@PathVariable("id") int id, Model model) {
        model.addAttribute("User", userService.findOne(id));
        return "users/admin/show";
    }

    @GetMapping("/new")
    public String newUser(@ModelAttribute("User") User user) {
        return "users/admin/new";
    }

    @PostMapping()
    public String create(@ModelAttribute("User") @Valid User user) {
        userService.save(user);
        return "redirect:/admin";
    }


    @GetMapping("/{id}/edit")
    public String edit(Model model, @PathVariable("id") int id) {
        model.addAttribute("User", userService.findOne(id));
        return "users/admin/edit";
    }

    @PatchMapping("/{id}")
    public String update(@ModelAttribute("User") @Valid User user,
                         @PathVariable("id") int id) {
        userService.update(id, user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
