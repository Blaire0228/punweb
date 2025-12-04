package pun.database.PunWeb.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String lastname;
    private String firstname;
    private String phone;
    private String birthdate;
    private String email;
    private String password;
    private String role;

    //Constructor
    public User(){
        //JPA需要一個無參數建構子
    }

    public User(String lastname,String firstname,String phone,String birthdate,String email,String password,String role){
        this.lastname = lastname;
        this.firstname = firstname;
        this.phone = phone;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    //Getter & Setter
    public Integer getId(){
        return id;
    }

    public void setID(Integer id) {
        this.id = id;
    }

    public String getLastname(){
        return lastname;
    }

    public void setLastname(String lastname){
        this.lastname = lastname;
    }

    public String getFirstname(){
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }

    public String getBirthdate(){
        return birthdate;
    }

    public void setBirthdate(String birthdate){
        this.birthdate = birthdate;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getRole(){
        return role;
    }

    public void setRole(String role){
        this.role = role;
    }
}
