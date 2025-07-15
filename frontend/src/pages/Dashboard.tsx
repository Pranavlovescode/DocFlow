import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Upload,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  Database,
  TrendingUp,
  Clock,
  FolderOpen,
  MoreVertical,
  Star,
  Share2,
} from "lucide-react";
import { Document } from "@/utils/api/document";


interface Document{
  id: string;
  name: string;
  version: number;
  fileId: string;
  uploadedAt: string;
  size:number;
  contentType:string;
  tags:string[];
};

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc1",
      name: "Project Proposal.pdf",
      version: 3,
      uploadedAt: "2025-07-10",
      size: 2.4,
      contentType: "pdf",
      tags: ["proposal", "project"],
      fileId:"random"
    },
    {
      id: "doc2",
      name: "Design_Doc_V1.docx",
      version: 5,
      uploadedAt: "2025-07-13",
      size: 1.8,
      contentType: "docx",
      tags: ["design", "documentation"],
      fileId: "random2",
    },
    {
      id: "doc3",
      name: "Meeting_Notes.txt",
      version: 2,
      uploadedAt: "2025-07-12",
      size: 45,
      contentType: "txt",
      tags: ["meeting", "notes"],
      fileId: "random3",
    },
    {
      id: "doc4",
      name: "Technical_Specifications.pdf",
      version: 7,
      uploadedAt: "2025-07-11",
      size:3.2,
      contentType: "pdf",
      tags: ["technical", "specs"],
      fileId: "random4",
    },
  ]);

  const latestDocuments: Document[] = Array.from(
    documents.reduce((map: Map<string, Document>, doc: Document) => {
      const existing = map.get(doc.name);
      if (!existing || new Date(doc.uploadedAt) > new Date(existing.uploadedAt)) {
        map.set(doc.name, doc); // keep the newer one
      }
      return map;
    }, new Map<string, Document>())
  ).map(([, doc]) => doc);



  const filteredDocuments = latestDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilter === "all" ||
        (selectedFilter === "recent" &&
          new Date(doc.uploadedAt).getTime() >
          Date.now() - 7 * 24 * 60 * 60 * 1000))
  );

  const getFileIcon = () => {
    return <FileText className="h-5 w-5 text-blue-500" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await Document.getAllUserDocument("pranavtitambe04@gmail.com");
      console.log("documents ", response)
      setDocuments(response);
    };
    fetchDocuments();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="pt-24">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight">
                  Document Dashboard
                </h1>
                <p className="text-xl text-blue-600 max-w-2xl">
                  Manage, version, and collaborate on your documents with ease.
                  Keep track of all your important files in one centralized
                  location.
                </p>
                <div className="flex items-center gap-6 text-blue-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>Last updated: Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    <span>{latestDocuments.length} documents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          {/* Search and Filter Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-500" />
                Document Library
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/upload-doc">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload New Document
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 border-2 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    onClick={() => setSelectedFilter("all")}
                    className="flex items-center gap-2 "
                  >
                    <Filter className="h-4 w-4" />
                    All
                  </Button>

                  <Button
                    variant={
                      selectedFilter === "recent" ? "default" : "outline"
                    }
                    onClick={() => setSelectedFilter("recent")}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Recent
                  </Button>
                </div>
              </div>

              {/* Documents Table */}
              <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                  <TableCaption className="text-gray-500 py-4">
                    {filteredDocuments.length} document(s) found
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200">
                      <TableHead className="font-semibold text-gray-700">
                        Document
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Size
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Versions
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Last Updated
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Tags
                      </TableHead>
                      <TableHead className="text-right font-semibold text-gray-700">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow
                        key={doc.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            {getFileIcon()}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800">
                                {doc.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {(doc.contentType?.split("/")[1] ?? "unknown").toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {(doc.size as unknown as number) / 1000}
                        </TableCell>
                        <TableCell>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                            {doc.version} versions
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {formatDate(doc.uploadedAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags && doc.tags.map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/doc/${doc.id}/versions`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline" className="h-8">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline" className="h-8">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
