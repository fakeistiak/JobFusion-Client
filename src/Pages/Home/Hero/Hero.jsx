import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 dark:border-white/10 dark:bg-white/5">
            <span className="text-sm font-medium">
              {"Exciting announcement 🎉"}
            </span>
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl font-poppins">
            Welcome to Our<span className="text-sky-600 dark:text-sky-400"> Amazing Platform</span>
          </h1>

          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover how our platform can revolutionize your workflow, boost
            productivity, and take your business to the next level.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button
              asChild
              className="rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              <Link to="/alljobs">Explore jobs</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full border border-black/10 px-6 py-3 text-base font-semibold text-black hover:bg-black/5 dark:border-white/10"
            >
              <a href="#">Learn more</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
