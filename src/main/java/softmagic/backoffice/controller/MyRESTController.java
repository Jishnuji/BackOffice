package softmagic.backoffice.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import softmagic.backoffice.model.User;
import softmagic.backoffice.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MyRESTController {
    private final UserService userService;

    @Autowired
    public MyRESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        userService.save(user);
        User userWithEmail = userService.getUserByEmail(user.getEmail());
        return userService.getUserById(userWithEmail.getId());
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.update(user);
        return userService.getUserById(user.getId());
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return "User with ID = " + id + " was deleted";
    }
}
