package pun.database.PunWeb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pun.database.PunWeb.model.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer>{

    Tag findByName(String name);
}
