package pun.database.PunWeb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository; //
import org.springframework.data.jpa.repository.Query;

import pun.database.PunWeb.model.Pun; //

public interface PunRepository extends JpaRepository<Pun, Integer> {
    // 根據創建者 ID 查找所有 Pun
    List<Pun> findByCreatedBy(Integer createdBy);

    // 查找所有不重複的 tags，並將結果以 List<String> 形式返回
    // TRIM(p.tags) 確保去除前後空格
    @Query("SELECT DISTINCT TRIM(p.tags) FROM Pun p")
    List<String> findDistinctTags();
}