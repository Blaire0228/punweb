package pun.database.PunWeb.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import pun.database.PunWeb.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
