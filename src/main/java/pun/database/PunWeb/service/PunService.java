package pun.database.PunWeb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pun.database.PunWeb.model.Pun;
import pun.database.PunWeb.repository.PunRepository;

@Service
public class PunService {

    @Autowired
    private PunRepository punRepository;
    public List<Pun> getAllPuns() {
        return punRepository.findAll();
    }

    public Pun getPunById(Integer id) {
        return punRepository.findById(id).orElse(null);
    }

    public Pun createPun(Pun pun) {
        return punRepository.save(pun);
    }

    public Pun updatePun(Integer id, Pun updatePun) {
        Optional<Pun> optionalPun = punRepository.findById(id);
        if(optionalPun.isPresent()) {
            Pun pun = optionalPun.get();
            pun.setContent(updatePun.getContent());
            pun.setTags(updatePun.getTags());
            pun.setCreatedBy(updatePun.getCreatedBy());
            return punRepository.save(pun);
        }
        return null;
    }
    public void deletePun(Integer id) {
        punRepository.deleteById(id);
    }

    // [新增功能] 根據創建者 ID 獲取諧音梗列表
    public List<Pun> getPunsByCreatedBy(Integer createdBy) {
        return punRepository.findByCreatedBy(createdBy);
    }

    // [新增功能] 獲取所有不重複的標籤
    public List<String> getAllDistinctTags() {
        return punRepository.findDistinctTags();
    }
}