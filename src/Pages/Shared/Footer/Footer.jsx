
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Company Name</h2>
            <p className="mb-4">We are dedicated to providing the best service to our customers.</p>
            <div className="flex space-x-4">
              <Link href="#">
                <FaFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#">
                <FaTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#">
                <FaInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#">
                <FaLinkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#">
                <FaGithub className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link href="#">Home</Link></li>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Services</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Services</h2>
            <ul className="space-y-2">
              <li><Link href="#">Web Development</Link></li>
              <li><Link href="#">Mobile Apps</Link></li>
              <li><Link href="#">UI/UX Design</Link></li>
              <li><Link href="#">Consulting</Link></li>
              <li><Link href="#">Digital Marketing</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-4">Stay updated with our latest news and offers.</p>
            <form className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-black text-white focus:border-white"
              />
              <Button variant="" type="submit" >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} JobFusion. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="#" className=" mr-4">Privacy Policy</Link>
            <Link href="#" className=" mr-4">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

