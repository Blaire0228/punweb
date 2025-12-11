package pun.database.PunWeb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pun.database.PunWeb.model.Pun;

import java.util.List;

public interface PunRepository extends JpaRepository<Pun, Integer> {
    //多標籤查詢
    @Query("SELECT DISTINCT p FROM Pun p JOIN p.tags t WHERE t.id IN :tagIds")
    List<Pun> findByTagIds(@Param("tagIds") List<Integer> tagIds);

    //多標籤+keyword查詢
    @Query("SELECT DISTINCT p FROM Pun p JOIN p.tags t " +
            "WHERE t.id IN :tagIds AND LOWER(p.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Pun> findByTagIdsAndKeyword(@Param("tagIds") List<Integer> tagIds,
                                     @Param("keyword") String keyword);

    //純文字搜尋
    List<Pun> findByContentContainingIgnoreCase(String keyword);

}
