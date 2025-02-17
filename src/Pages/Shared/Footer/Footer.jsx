import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer=()=> {
  return (
    <footer className="bg-black text-gray-200">
      <div className="max-w-7xl px-6 sm:px-8 lg:px-12 mx-auto pt-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-white text-lg font-semibold mb-4">JobFusion</Link>
            <p className="mb-4">
              We are dedicated to providing the best service to our customers.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="h-6 w-6" />
              <FaTwitter className="h-6 w-6" />
              <FaInstagram className="h-6 w-6" />
              <FaLinkedin className="h-6 w-6" />
              <FaGithub className="h-6 w-6" />
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/statistics">Statistics Us</Link>
              </li>
              <li>
                <Link to="/applied">Applied Jobs</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Services</h2>
            <ul className="space-y-2">
              <li>Job Listings</li>
              <li>Resume Building</li>
              <li>Career Guidance</li>
              <li>Interview Preparation</li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-4">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex flex-col space-y-2 dark:text-white">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-black text-white focus:border-white"
              />
              <Button variant="destructive" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} JobFusion. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link href="#" className=" mr-4">
              Privacy Policy
            </Link>
            <Link href="#" className=" mr-4">
              Terms of Service
            </Link>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
