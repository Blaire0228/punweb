package pun.database.PunWeb.service;

import org.springframework.stereotype.Service;
import pun.database.PunWeb.model.User;
import pun.database.PunWeb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user){
        return userRepository.save(user);
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
