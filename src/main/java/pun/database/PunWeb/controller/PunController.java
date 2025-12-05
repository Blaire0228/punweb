package pun.database.PunWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pun.database.PunWeb.model.Pun;
import pun.database.PunWeb.service.PunService;

import java.util.List;

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
