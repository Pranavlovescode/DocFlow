import { Document } from "@/utils/api/document";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Document {
  id: string;
  name: string;
  version: number;
  fileId: string;
  uploadedAt: string;
  size: number;
  contentType: string;
  tags: string[];
}

function DocumentVersions() {
  const { docName } = useParams<{ docName: string }>();
  const [documents ,setDocuments] = useState<Document[]>([]);

  useEffect(()=>{
    const fetchDocuments=async()=>{
      const response = await Document.getAllVersionOfDocument(docName);
      console.log(response)
      setDocuments(response);
    }
    fetchDocuments()
  },[])
  return <div>DocumentVersions</div>;
}

export default DocumentVersions;
