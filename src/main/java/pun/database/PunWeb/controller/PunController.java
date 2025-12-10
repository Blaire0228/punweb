package pun.database.PunWeb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pun.database.PunWeb.model.Pun;
import pun.database.PunWeb.service.PunService;

@RestController
@RequestMapping("/puns")
@CrossOrigin(origins = "http://localhost:3000")
public class PunController {

    @Autowired
    private PunService punService;

    @GetMapping public List<Pun> getAllpuns() {
        return punService.getAllPuns();
    }

    @GetMapping("/{id}")
    public Pun getPunById(@PathVariable Integer id) {
        return punService.getPunById(id);
    }

    // [新增功能] 獲取特定使用者新增的諧音梗列表
    @GetMapping("/user/{userId}")
    public List<Pun> getPunsByUserId(@PathVariable Integer userId) {
        return punService.getPunsByCreatedBy(userId);
    }

    // [新增功能] 獲取所有不重複的標籤列表
    @GetMapping("/tags")
    public List<String> getAllTags() {
        return punService.getAllDistinctTags();
    }

    @PostMapping
    public Pun createPun(@RequestBody Pun pun) {
        return punService.createPun(pun);
    }

    @PostMapping("/{id}")
    public Pun updatePun(@PathVariable Integer id, @RequestBody Pun pun) {
        return punService.updatePun(id, pun);
    }

    @DeleteMapping("/{id}")
    public void deletePun(@PathVariable Integer id) {
        punService.deletePun(id);
    }
}