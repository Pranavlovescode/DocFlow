package com.example.docflow.repo;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.docflow.entity.DocumentVersion;

public interface DocsRepo extends MongoRepository<DocumentVersion, String> {
        // Custom finder methods
    List<DocumentVersion> findByNameOrderByVersionDesc(String name);

    DocumentVersion findTopByNameOrderByVersionDesc(String name);

    DocumentVersion findByNameAndVersion(String name, int version);

    List<DocumentVersion> findAllByName(String name);

    List<DocumentVersion> findByNameContaining(String name);
}
