package softmagic.backoffice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import softmagic.backoffice.dao.RoleDao;
import softmagic.backoffice.model.Role;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleDao roleDao;

    @Autowired
    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    @Transactional
    public List<Role> getRoleList() {
        return roleDao.getRoleList();
    }

    @Override
    @Transactional
    public Role getRoleById(Long id) {
        return roleDao.getRoleById(id);
    }

    @Override
    public Set<Role> getSetOfRolesFromList(List<String> rolesId) {
        return rolesId.stream()
                .map(id -> getRoleById(Long.parseLong(id)))
                .collect(Collectors.toSet());
    }
}
