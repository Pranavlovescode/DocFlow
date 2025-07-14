package com.example.docflow.services;

import com.example.docflow.entity.DocumentVersion;
import com.example.docflow.entity.User;
import com.example.docflow.repo.DocsRepo;
import com.example.docflow.repo.UserRepo;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class DocsServices {

    private final DocsRepo docsRepo;
    private final GridFsTemplate gridFsTemplate;
    private final UserRepo userRepo;

    public DocsServices(DocsRepo docsRepo, GridFsTemplate gridFsTemplate, UserRepo userRepo) {
        this.docsRepo = docsRepo;
        this.gridFsTemplate = gridFsTemplate;
        this.userRepo = userRepo;
    }

    public String uploadDocs(MultipartFile file, String uploadedBy) throws IOException {

        User user = userRepo.findByEmail(uploadedBy);

        String fileName = file.getOriginalFilename();
        if (fileName == null) return "File name is missing";

        // Get latest version
        DocumentVersion latest = docsRepo.findTopByNameOrderByVersionDesc(fileName);
        int newVersion = latest == null ? 1 : latest.getVersion() + 1;

        // Store file in GridFS
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), fileName, file.getContentType());

        // Create metadata
        DocumentVersion doc = new DocumentVersion();
        doc.setName(fileName);
        doc.setVersion(newVersion);
        doc.setFileId(fileId.toHexString());
        doc.setUploadedAt(new Date());
        doc.setUploadedBy(user);
        doc.setSize(file.getSize());
        doc.setContentType(file.getContentType());

        docsRepo.save(doc);
        return "File uploaded successfully with version " + newVersion;
    }

    public List<DocumentVersion> findByNameContaining(String name){
        return docsRepo.findByNameContaining(name);
    }

}
