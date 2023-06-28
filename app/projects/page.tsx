import Project from "@/components/project";

interface ProjectData {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const projects: ProjectData[] = [
  {
    title: "feliznavi.dad",
    description: "a small site used in promoting the .dad TLD",
    imageUrl:
      "https://qgxvhncvypeqowyohhys.supabase.co/storage/v1/object/public/blog-images/feliznavidad.png?t=2023-06-28T21%3A45%3A16.701Z",
    link: "https://www.feliznavi.dad",
  },
  {
    title: "Arq y Di Architecture Firm",
    description: "Built a website for LA based architecture firm AyD",
    imageUrl:
      "https://qgxvhncvypeqowyohhys.supabase.co/storage/v1/object/public/blog-images/ayd.png?t=2023-06-28T21%3A54%3A57.966Z",
    link: "https://www.arq-y-di.com",
  },
  // Add more projects as needed
];

const ProjectsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Projects</h1>

      <section className="flex flex-wrap -m-4">
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </section>
    </div>
  );
};

export default ProjectsPage;
