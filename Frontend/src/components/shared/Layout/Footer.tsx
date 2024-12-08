import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    resources: [
      { name: "Career Advice", href: "/career-advice" },
      { name: "Resume Tips", href: "/resume-tips" },
      { name: "Interview Guide", href: "/interview-guide" },
      { name: "Salary Calculator", href: "/salary-calculator" },
    ],
    about: [
      { name: "Jobs", href: "/home" },
      { name: "My Applications", href: "/applies" },
      { name: "Profile", href: "/upload-resume" },
      { name: "Sign In", href: "/login" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="mb-4 block">
              <img src="/logo.png" alt="logo" className="h-20 w-auto" />
            </Link>
            <p className="mt-4 text-sm">
              Connecting talented professionals with their dream careers. Find
              your next opportunity with us.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              About
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-base text-gray-600 hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-base text-gray-600 hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Follow Me
            </h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.facebook.com/sahid.akter.526"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook className="h-8 w-8" />
              </a>
              <a
                href="https://www.instagram.com/mr_shahid_aktar"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="h-8 w-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/shahid-aktar-mandal-331872292"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin className="h-8 w-8" />
              </a>
              <a
                href="https://github.com/Shahidaktar"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                <FaGithub className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            2024 HIRE. All rights reserved. Created by{" "}
            <a
              href="https://github.com/Shahidaktar"
              target="_blank"
              className="text-blue-400 hover:text-blue-300"
            >
              Shahid Aktar Mandal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
