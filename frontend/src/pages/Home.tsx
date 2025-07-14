import Navbar from "@/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Server, Code, Database, Layers, Users, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-purple-50 text-purple-700 border-purple-200">
              � Portfolio Project
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                Manage Documents
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Like Never Before
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                DocFlow is a full-stack document versioning system built to demonstrate modern web development skills. 
                Featuring intelligent version control, real-time collaboration, and a sleek user interface. 
                A showcase project highlighting Spring Boot, React, and modern development practices.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Explore Demo
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300">
                View Code
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12">
              <p className="text-sm text-gray-500 mb-6">Built with modern technologies</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-semibold text-gray-400">Spring Boot</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-semibold text-gray-400">React + TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-700" />
                  <span className="text-lg font-semibold text-gray-400">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-0" />

        {/* Features Section */}
        <div className="py-20 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Technical Skills Demonstrated
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key technologies and concepts implemented in this project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Full-Stack Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete end-to-end application development using Spring Boot REST APIs, 
                React frontend with TypeScript, and PostgreSQL database integration.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Modern UI/UX</h3>
              <p className="text-gray-600 leading-relaxed">
                Responsive design with Tailwind CSS, component-based architecture using shadcn/ui, 
                and smooth animations for an engaging user experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices</h3>
              <p className="text-gray-600 leading-relaxed">
                Clean code architecture, proper error handling, security implementation, 
                and comprehensive testing. Demonstrates industry-standard development practices.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Interested in My Work?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explore the live demo or check out the source code to see the implementation details
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
                Try Live Demo
              </Button>
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
                View Source Code
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm opacity-80">
                📧 Contact me for opportunities • 💼 Available for hire • � Let's build something amazing
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
