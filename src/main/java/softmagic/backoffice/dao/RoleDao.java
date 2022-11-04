package softmagic.backoffice.dao;

import softmagic.backoffice.model.Role;
import java.util.List;

public interface RoleDao {
    List<Role> getRoleList();
    Role getRoleById(Long id);
}
