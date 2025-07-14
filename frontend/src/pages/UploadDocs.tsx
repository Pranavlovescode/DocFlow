import React, { useState, useRef } from "react";
import Navbar from "@/layouts/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  X,
  Cloud,
  Tag
} from "lucide-react";

export default function UploadDoc() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      alert("Please select a file and enter a title.");
      return;
    }

    setIsLoading(true);

    // Prepare FormData for backend upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("notes", notes);
    formData.append("tags", tags);

    try {
      await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    return <FileText className="h-6 w-6 text-blue-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Cloud className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Upload Document
            </h1>
            <p className="text-gray-600 text-lg">
              Share your documents with version control and collaboration features
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                <Upload className="h-6 w-6 text-blue-500" />
                Document Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title */}
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Document Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Project Specifications v1.0"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* File Upload Area */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Select File
                  </Label>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : file
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 hover:border-gray-400 bg-gray-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                    />
                    
                    {file ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getFileIcon()}
                          <div>
                            <p className="font-medium text-gray-800">{file.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          {dragActive ? "Drop your file here" : "Upload a document"}
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Drag and drop or click to browse
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          Choose File
                        </Button>
                        <p className="text-xs text-gray-400 mt-2">
                          Supports: PDF, DOC, DOCX, TXT
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Version Notes */}
                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Version Notes
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Describe the changes, updates, or purpose of this document version..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px] border-2 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <Label htmlFor="tags" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags
                    <span className="text-gray-400 font-normal">(comma separated)</span>
                  </Label>
                  <Input
                    id="tags"
                    placeholder="design, proposal, meeting, draft, final"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="h-12 border-2 focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500">
                    Add tags to make your document easier to find and organize
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading || !file || !title}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Uploading...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Cloud className="h-5 w-5" />
                        Upload Document
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
