package softmagic.backoffice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import softmagic.backoffice.model.Role;
import softmagic.backoffice.model.User;
import softmagic.backoffice.service.RoleService;
import softmagic.backoffice.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;


@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    @GetMapping("")
    public String index(Model model, Principal principal) {
        model.addAttribute("users", userService.getUsers());
        model.addAttribute("roles", roleService.getRoleList());
        model.addAttribute("log_user", userService.getUserByName(principal.getName()));
        return "index";
    }

    @GetMapping("/edit/{id}")
    @ResponseBody
    public User getUser (@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/delete/{id}")
    @ResponseBody
    public User deleteUser (@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @PatchMapping ("/update")
    public String updateUser(@Validated(User.class) @ModelAttribute("user") User user,
                             @RequestParam("authorities") List <String> listId) {
        Set<Role> roles = roleService.getSetOfRolesFromList(listId);
        user.setRoles(roles);
        userService.update(user);
        return "redirect:/admin";
    }

    @PostMapping("/new_user")
    public String createUser(@ModelAttribute("user") User user,
                         @RequestParam("authorities") List <String> listId) {
        Set<Role> roles = roleService.getSetOfRolesFromList(listId);
        user.setRoles(roles);
        userService.save(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/remove")
    public String removeUser(@ModelAttribute("user") User user) {
        userService.delete(user.getId());
        return "redirect:/admin";
    }
}
