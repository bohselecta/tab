"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const { items } = await response.json();
      setProjects(items);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const recentProjects = projects.slice(0, 6);

  return (
    <div className="container pt-10 space-y-6">
      <div>
        <h1 className="h1">Dashboard</h1>
        <p className="p text-white/80">Your recent projects and creative workspace</p>
      </div>

      {/* Quick Actions */}
      <div className="glass p-6 rounded-xl2">
        <h2 className="h2 mb-4">Quick Start</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/studio/video">
            <div className="p-4 border border-glassStroke rounded-lg hover:bg-glassStroke transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-video" />
                <span className="font-medium">Video Studio</span>
              </div>
              <p className="text-sm text-white/80">Analyze shows and create pilots</p>
            </div>
          </Link>
          
          <Link href="/studio/audio">
            <div className="p-4 border border-glassStroke rounded-lg hover:bg-glassStroke transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-audio" />
                <span className="font-medium">Audio Studio</span>
              </div>
              <p className="text-sm text-white/80">Deconstruct music and write songs</p>
            </div>
          </Link>
          
          <Link href="/studio/web">
            <div className="p-4 border border-glassStroke rounded-lg hover:bg-glassStroke transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-web" />
                <span className="font-medium">Web Studio</span>
              </div>
              <p className="text-sm text-white/80">Turn concepts into websites</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="h2">Recent Projects</h2>
          <Link href="/studio" className="text-sm text-white/80 hover:text-white">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8 text-white/60">Loading projects...</div>
        ) : recentProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} spec={project} />
            ))}
          </div>
        ) : (
          <div className="glass p-6 rounded-xl2">
            <div className="text-center py-8">
              <h3 className="h3 mb-2">No projects yet</h3>
              <p className="p mb-4">Start creating your first project in the Studio</p>
              <Link href="/studio" className="btn btn-primary">Go to Studio</Link>
            </div>
          </div>
        )}
      </div>

      {/* Gallery CTA */}
      <div className="glass p-6 rounded-xl2">
        <div className="text-center py-8">
          <h2 className="h2 mb-2">Share Your Work</h2>
          <p className="p mb-4">Publish your projects to the gallery and inspire others</p>
          <Link href="/gallery" className="btn btn-primary">Browse Gallery</Link>
        </div>
      </div>
    </div>
  );
}
