import { Button } from "@/components/ui/button";
import heroImg from "../../../assets/images/hero.jpg";

export default function HeroWithImage() {
  return (
    <section className="dark:bg-gray-900 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              className="w-full max-w-md md:max-w-lg object-cover rounded-xl border-2 border-black"
              src={heroImg} 
              alt="Hero" 
            />
          </div>
          <div className="text-center md:text-left flex-col justify-center order-2 md:order-1">
            <h1 className="text-4xl font-poppins tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-sky-600">Our Amazing Platform</span>
            </h1>
            <p className="mt-4 font-poppins text-lg text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl">
              Discover how our platform can revolutionize your workflow, boost productivity, and take your business to the next level.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
              <Button className="px-8 py-3 text-lg font-medium">
                Get started
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg font-medium">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
