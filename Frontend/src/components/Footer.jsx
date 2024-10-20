import React from "react";
import {
  FaSquareXTwitter,
  FaFacebook,
  FaLinkedin,
  FaSquareInstagram,
} from "react-icons/fa6";

const Footer = () => {
  const eventLinks = [
    { title: "Create Events", url: "#" },
    { title: "Pricing", url: "/pricing" },
    { title: "Event Marketing Platform", url: "#" },
    { title: "Community Guidelines", url: "#" },
    { title: "FAQs", url: "#" },
  ];

  const eventLinks2 = [
    { title: "Sell Tickets Online", url: "#" },
    { title: "Event Planning", url: "#" },
    { title: "Sell Concert Tickets Online", url: "#" },
    { title: "Event Payment Section", url: "#" },
    { title: "Halloween Party Planning", url: "#" },
    { title: "Virtual Events Platform", url: "#" },
    { title: "QR Codes For Events Check-In", url: "#" },
    { title: "Post Your Event Online", url: "#" },
  ];

  const eventLinks3 = [
    { title: "Food & Drink Events", url: "#" },
    { title: "Holiday Events", url: "#" },
    { title: "Music Events", url: "#" },
    { title: "Hobby Events", url: "#" },
  ];

  const eventLinks4 = [
    { title: "Contact Support", url: "#" },
    { title: "Contact Sales", url: "#" },
  ];

  const eventLinks5 = [
    { title: "About", url: "#" },
    { title: "Blog", url: "#" },
    { title: "Help", url: "#" },
    { title: "Security", url: "#" },
    { title: "Developers", url: "#" },
    { title: "Status", url: "#" },
    { title: "Terms", url: "#" },
    { title: "Privacy", url: "#" },
  ];

  return (
    <footer className="bg-purple-950 text-white py-10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-300">
              Use EventUni
            </h4>
            <ul className="mt-4 space-y-2">
              {eventLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-base hover:text-purple-600 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-300">
              Plan Events
            </h4>
            <ul className="mt-4 space-y-2">
              {eventLinks2.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-base hover:text-purple-600 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-300">
              Find Events
            </h4>
            <ul className="mt-4 space-y-2">
              {eventLinks3.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-base hover:text-purple-600 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-300">
              Contact With Us
            </h4>
            <ul className="mt-4 space-y-2">
              {eventLinks4.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-base hover:text-purple-600 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-3 mt-6">
              <a
                href="https://www.twitter.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="https://www.facebook.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
              >
                <FaSquareInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-gray-400 mb-2">
            © 2024 EventUni™. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center space-x-4 mt-2">
            {eventLinks5.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="text-base hover:text-purple-600 transition-colors"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
