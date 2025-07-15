import Navbar from "@/layouts/Navbar";
import { Document } from "@/utils/api/document";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";

interface DocumentVersion {
  id: string;
  name: string;
  version: number;
  fileId: string;
  uploadedAt: string;
  size: number;
  contentType: string;
  tags: string[];
}

interface DocumentContent {
  content: string;
  contentType: string;
  fileUrl: string;
  blob: Blob;
}

function DocumentVersions() {
  const { docName } = useParams<{ docName: string }>();
  const [documents, setDocuments] = useState<DocumentVersion[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentVersion | null>(null);
  const [documentContent, setDocumentContent] = useState<DocumentContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingDocuments, setFetchingDocuments] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setFetchingDocuments(true);
      setError(null);
      try {
        const response = await Document.getAllVersionOfDocument(docName);
        console.log(response);
        setDocuments(response);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError("Failed to fetch document versions. Please try again.");
      } finally {
        setFetchingDocuments(false);
      }
    };
    fetchDocuments();
  }, [docName]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (documentContent?.fileUrl) {
        URL.revokeObjectURL(documentContent.fileUrl);
      }
    };
  }, [documentContent?.fileUrl]);

  const handleViewDocument = async (document: DocumentVersion) => {
    setLoading(true);
    setError(null);
    
    // Cleanup previous object URL
    if (documentContent?.fileUrl) {
      URL.revokeObjectURL(documentContent.fileUrl);
    }
    
    try {
      const content = await Document.getDocumentContent(document.name, document.version);
      setDocumentContent(content);
      setSelectedDocument(document);
    } catch (error) {
      console.error("Error fetching document content:", error);
      setError("Failed to load document content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileTypeIcon = (contentType: string): string => {
    if (contentType?.includes("pdf")) return "📄";
    if (contentType?.includes("word")) return "📝";
    if (contentType?.includes("text")) return "📃";
    if (contentType?.includes("image")) return "🖼️";
    return "📄";
  };

  const getSafeContentType = (content: DocumentContent | null): string => {
    return content?.contentType || selectedDocument?.contentType || "unknown";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="pt-24">
          <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {docName ? decodeURIComponent(docName) : "Document Versions"}
              </h1>
              <p className="text-gray-600">
                Select a document version to view its content
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Main Content - Side by Side Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Document Versions List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    📚 Document Versions
                  </h2>
                  
                  {fetchingDocuments ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            <div className="flex-1">
                              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                            selectedDocument?.id === doc.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleViewDocument(doc)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{getFileTypeIcon(doc.contentType)}</span>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">
                                Version {doc.version}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {formatDate(doc.uploadedAt)}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatFileSize(doc.size)} • {doc.contentType.split('/')[1]?.toUpperCase()}
                              </p>
                              {doc.tags && doc.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {doc.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {doc.tags.length > 2 && (
                                    <span className="text-xs text-gray-500">+{doc.tags.length - 2}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            {loading && selectedDocument?.id === doc.id && (
                              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {documents.length === 0 && !fetchingDocuments && (
                        <div className="text-center py-8">
                          <div className="text-4xl mb-3">📄</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No versions found</h3>
                          <p className="text-gray-600 text-sm">No versions available for this document.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Document Viewer */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {selectedDocument && documentContent ? (
                    <>
                      {/* Document Header */}
                      <div className="bg-gray-50 px-6 py-4 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{selectedDocument.name}</h2>
                            <p className="text-gray-600 text-sm mt-1">
                              Version {selectedDocument.version} • {formatDate(selectedDocument.uploadedAt)} • {formatFileSize(selectedDocument.size)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (documentContent?.fileUrl && selectedDocument?.name) {
                                  const link = document.createElement('a');
                                  link.href = documentContent.fileUrl;
                                  link.download = selectedDocument.name;
                                  link.click();
                                }
                              }}
                              disabled={!documentContent?.fileUrl}
                            >
                              📥 Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedDocument(null);
                                setDocumentContent(null);
                              }}
                            >
                              ✕ Close
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Document Content */}
                      <div className="p-6">
                        {(() => {
                          const contentType = getSafeContentType(documentContent);
                          
                          if (contentType.includes("text")) {
                            return (
                              <div className="bg-gray-50 rounded-lg p-4 min-h-96 max-h-[600px] overflow-auto">
                                <div className="bg-white rounded p-4 shadow-sm">
                                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                    {documentContent?.content || 'No content available'}
                                  </pre>
                                </div>
                              </div>
                            );
                          } else if (contentType.includes("pdf")) {
                            return (
                              <div className="min-h-96">
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                  <iframe
                                    src={documentContent?.fileUrl}
                                    className="w-full h-[600px] border-0"
                                    title={`PDF: ${selectedDocument.name}`}
                                  />
                                </div>
                                <div className="flex gap-2 justify-center mt-4">
                                  <Button 
                                    onClick={() => documentContent?.fileUrl && window.open(documentContent.fileUrl, '_blank')}
                                    disabled={!documentContent?.fileUrl}
                                  >
                                    📖 Open in New Tab
                                  </Button>
                                </div>
                              </div>
                            );
                          } else if (contentType.includes("image")) {
                            return (
                              <div className="text-center min-h-96 flex items-center justify-center">
                                <img 
                                  src={documentContent?.fileUrl || ''} 
                                  alt={selectedDocument?.name || 'Document'}
                                  className="max-w-full max-h-[600px] mx-auto rounded-lg shadow-md"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `
                                        <div class="text-center py-12">
                                          <div class="text-6xl mb-4">🖼️</div>
                                          <h3 class="text-xl font-semibold text-gray-900 mb-2">Image could not be loaded</h3>
                                          <p class="text-gray-600">The image file might be corrupted or unavailable.</p>
                                        </div>
                                      `;
                                    }
                                  }}
                                />
                              </div>
                            );
                          } else if (contentType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") || 
                                     contentType.includes("application/msword")) {
                            return (
                              <div className="text-center py-12 min-h-96 flex flex-col items-center justify-center">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Word Document</h3>
                                <p className="text-gray-600 mb-6">
                                  Word documents cannot be previewed directly in the browser.
                                </p>
                                <div className="flex gap-2">
                                  <Button 
                                    onClick={() => documentContent?.fileUrl && window.open(documentContent.fileUrl, '_blank')}
                                    disabled={!documentContent?.fileUrl}
                                  >
                                    📖 Open Document
                                  </Button>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div className="text-center py-12 min-h-96 flex flex-col items-center justify-center">
                                <div className="text-6xl mb-4">{getFileTypeIcon(contentType)}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Document Preview</h3>
                                <p className="text-gray-600 mb-6">
                                  This file type cannot be previewed directly in the browser.
                                </p>
                                <div className="flex gap-2">
                                  <Button 
                                    onClick={() => documentContent?.fileUrl && window.open(documentContent.fileUrl, '_blank')}
                                    disabled={!documentContent?.fileUrl}
                                  >
                                    📖 Open File
                                  </Button>
                                </div>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    </>
                  ) : loading ? (
                    <div className="p-6">
                      <div className="text-center py-12">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading document...</h3>
                        <p className="text-gray-600">Please wait while we fetch the document content.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="text-center py-16">
                        <div className="text-6xl mb-4">�</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a document version</h3>
                        <p className="text-gray-600">Choose a version from the list to view its content</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocumentVersions;
