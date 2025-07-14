package com.example.docflow.entity;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="Documents")
public class DocumentVersion {
    
    @Id
    private String id;
    private String name; // Original file name
    private int version;

    private String fileId; // ID from GridFS

    private Date uploadedAt;
    private User uploadedBy;

    private long size;
    private String contentType;

    private String description;
    private List<String> tags;

    private String checksum;

}
