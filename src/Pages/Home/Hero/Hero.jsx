import { Button } from "@/components/ui/button";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import bannerAnimation from "../../../assets/animations/bannerAnimation.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: bannerAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Hero = () => {
  return (
    <section className="w-full bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 text-center md:text-left">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl font-poppins bg-gradient-to-r from-gray-800 via-gray-500 to-gray-300 dark:from-white dark:via-gray-500 dark:to-white/60 bg-clip-text text-transparent animate-gradient">
              Welcome to Our
              <span className="text-teal-600 dark:text-teal-400">
                {" "}
                Amazing Platform
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Discover how our platform can revolutionize your workflow, boost
              productivity, and take your business to the next level.
            </p>

            <div className="flex gap-4 sm:gap-6 justify-center md:justify-start">
              <Button className="rounded-full bg-teal-600 px-6 py-3 text-base font-semibold text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600">
                <Link to="/alljobs">Explore jobs</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="rounded-full border border-black/10 px-6 py-3 text-base font-semibold text-black hover:bg-black/5 dark:hover:bg-white/50 dark:border-white/10 dark:hover:text-white"
              >
                <a href="#">Learn more</a>
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
