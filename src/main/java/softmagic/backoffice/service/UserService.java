package softmagic.backoffice.service;

import softmagic.backoffice.model.User;
import softmagic.backoffice.model.Role;
import org.springframework.security.core.userdetails.UserDetailsService;
import java.util.List;
import java.util.Set;

public interface UserService extends UserDetailsService {
    List<User> getUsers();
    User getUserById(Long id);
    void save(User user);
    void update(User user);
    void delete(Long id);
    User getUserByName(String name);
    User getUserByEmail(String email);
}
