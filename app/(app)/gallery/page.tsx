import ProjectCard from "@/components/ProjectCard";

export default async function Gallery() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/gallery`, { cache: "no-store" });
  const { items } = await res.json();
  return (
    <div className="container pt-10 space-y-4">
      <h1 className="h1">Gallery</h1>
          <p className="p text-white/80">Public projects you can read and remix.</p>
          {items?.length === 0 && (
            <div className="glass p-6 rounded-xl2 mt-6">
              <div className="text-center py-8">
                <h3 className="h3 mb-2">No public projects yet</h3>
                <p className="p mb-4">Publish from any project to appear here.</p>
                <a href="/studio" className="btn btn-primary">Start Creating</a>
              </div>
            </div>
          )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {items?.map((x:any) => <ProjectCard key={x.id} spec={x} />)}
      </div>
    </div>
  );
}
