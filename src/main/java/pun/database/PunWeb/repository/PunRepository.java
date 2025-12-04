package pun.database.PunWeb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pun.database.PunWeb.model.Pun;

public interface PunRepository extends JpaRepository<Pun, Integer> {

}
