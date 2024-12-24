import { Button } from "@/components/ui/button"
import heroImg from "../../../assets/images/user.png"

export default function HeroWithImage() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-primary">Our Amazing Platform</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl md:mx-0">
              Discover how our platform can revolutionize your workflow, boost productivity, and take your business to the next level.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center md:justify-start">
              <div className="rounded-md shadow">
                <Button className="w-full px-8 py-3 text-base font-medium">
                  Get started
                </Button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button variant="outline" className="w-full px-8 py-3 text-base font-medium">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0 flex justify-center">
           <img className="lg:w-auto lg:h-auto w-[400px] h-[350px]" src={heroImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

