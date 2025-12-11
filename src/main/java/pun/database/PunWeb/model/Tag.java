package pun.database.PunWeb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String name;

    // 多對多反向關聯，不會產生新表
    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private List<Pun> puns = new ArrayList<>();

    public Tag() {}

    public Tag(String name) {
        this.name = name;
    }

    // Getter / Setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Pun> getPuns() {
        return puns;
    }

    public void setPuns(List<Pun> puns) {
        this.puns = puns;
    }
}
