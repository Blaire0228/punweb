package pun.database.PunWeb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pun.database.PunWeb.model.Pun;
import pun.database.PunWeb.repository.PunRepository;

import java.util.List;
import java.util.Optional;

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

    public List<Pun> search(List<Integer> tagIds, String keyword) {

        boolean noTags = (tagIds == null || tagIds.isEmpty());
        boolean noKeyword = (keyword == null || keyword.isBlank());

        if (noTags && noKeyword)
            return punRepository.findAll();

        if (noTags)
            return punRepository.findByContentContainingIgnoreCase(keyword);

        if (noKeyword)
            return punRepository.findByTagIds(tagIds);

        return punRepository.findByTagIdsAndKeyword(tagIds, keyword);
    }
}
