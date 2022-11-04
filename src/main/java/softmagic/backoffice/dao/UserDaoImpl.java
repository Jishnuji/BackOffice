package softmagic.backoffice.dao;

import org.springframework.stereotype.Repository;
import softmagic.backoffice.model.User;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User getUserByEmail(String email) {
        Query query = entityManager.createQuery("select users from User users where users.email = :emailParam");
        query.setParameter("emailParam", email);
        return (User) query.getSingleResult();
    }

    @Override
    public User getUserByName(String name) {
        Query query = entityManager.createQuery("select users from User users where users.username = :nameParam");
        query.setParameter("nameParam", name);
        return (User) query.getSingleResult();
    }

    @Override
    public List<User> getUsers() {
        return entityManager.createQuery("select users from User users").getResultList();
    }

    @Override
    public User getUserById(Long id) {
        Query query = entityManager.createQuery("select user from User user where user.id = :paramId");
        query.setParameter("paramId", id);
        return (User) query.getSingleResult();
    }

    @Override
    public void save(User user) {
        entityManager.persist(user);
    }

    @Override
    public void update(User updatedUser) {
        entityManager.merge(updatedUser);
    }

    @Override
    public void delete(Long id) {
        entityManager.remove(getUserById(id));
    }
}
