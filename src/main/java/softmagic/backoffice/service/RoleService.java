package softmagic.backoffice.service;

import softmagic.backoffice.model.Role;
import java.util.List;
import java.util.Set;

public interface RoleService {
    List<Role> getRoleList();
    Role getRoleById(Long id);
    Set<Role> getSetOfRolesFromList(List<String> listId);
}
