package com.example.docflow.controller;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.docflow.entity.DocumentVersion;
import com.example.docflow.repo.DocsRepo;
import com.example.docflow.services.DocsServices;
import com.mongodb.client.gridfs.model.GridFSFile;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/docs")
public class DocsController {

    @Autowired
    DocsServices docsServices;
    @Autowired
    DocsRepo docsRepo;
    @Autowired
    GridFsTemplate gridFsTemplate;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("uploadedBy") String uploadedBy) throws IOException {

        return ResponseEntity.ok(docsServices.uploadDocs(file,uploadedBy));
    }
    @GetMapping("/{name}")
    public ResponseEntity<?> getLatestFile(@PathVariable String name, HttpServletResponse response) throws IOException {
        DocumentVersion latest = docsRepo.findTopByNameOrderByVersionDesc(name);
        if (latest == null) return ResponseEntity.notFound().build();

        GridFSFile gridFSFile = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(latest.getFileId())));
        if (gridFSFile == null) return ResponseEntity.notFound().build();

        GridFsResource resource = gridFsTemplate.getResource(gridFSFile);

        response.setContentType(latest.getContentType());
        StreamUtils.copy(resource.getInputStream(), response.getOutputStream());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{name}/v/{version}")
    public ResponseEntity<?> getVersion(@PathVariable String name, @PathVariable int version, HttpServletResponse response) throws IOException {
        DocumentVersion doc = docsRepo.findByNameAndVersion(name, version);
        if (doc == null) return ResponseEntity.notFound().build();

        GridFSFile gridFSFile = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(doc.getFileId())));
        if (gridFSFile == null) return ResponseEntity.notFound().build();

        GridFsResource resource = gridFsTemplate.getResource(gridFSFile);

        response.setContentType(doc.getContentType());
        StreamUtils.copy(resource.getInputStream(), response.getOutputStream());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{name}/versions")
    public List<DocumentVersion> getAllVersions(@PathVariable String name) {
        return docsRepo.findByNameOrderByVersionDesc(name);
    }

    @GetMapping("/")
    public ResponseEntity<List<DocumentVersion>> getByName(@RequestParam String name){
        return ResponseEntity.ok().body(docsServices.findByNameContaining(name));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getAllDocumentOfUser(@PathVariable String email){
        return ResponseEntity.ok().body(docsServices.getAllDocumentOfUser(email));
    }

}
