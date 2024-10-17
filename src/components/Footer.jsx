import React from 'react';
import { FaSquareXTwitter,FaFacebook,FaLinkedin,FaSquareInstagram} from "react-icons/fa6";

const Footer = () => {

    const eventLinks = [
        { title: 'Create Events', url: '#' },
        { title: 'Pricing', url: '/pricing' },
        { title: 'Event Marketing Platform', url: '#' },
        { title: 'Community Guidelines', url: '#' },
        { title: 'FAQs', url: '#' },
    ];

    const eventLinks2 = [
        { title: 'Sell Tickets Online', url: '#' },
        { title: 'Event Planning', url: '#' },
        { title: 'Sell Concert Tickets Online', url: '#' },
        { title: 'Event Payment Section', url: '#' },
        { title: 'Halloween Party Planning', url: '#' },
        { title: 'Virtual Events Platform', url: '#' },
        { title: 'QR Codes For Events Check-In', url: '#' },
        { title: 'Post Your Event Online', url: '#' }
    ];

    const eventLinks3 = [
        { title: 'Food & Drink Events', url: '#' },
        { title: 'Holiday Events', url: '#' },
        { title: 'Music Events', url: '#' },
        { title: 'Hobby Events', url: '#' },
    ];

    const eventLinks4 = [
        { title: 'Contact Support', url: '#' },
        { title: 'Contact Sales', url: '#' },
    ];

    const eventLinks5 = [
        { title: 'About', url: '#' },
        { title: 'Blog', url: '#' },
        { title: 'Help', url: '#' },
        { title: 'Security', url: '#' },
        { title: 'Developers', url: '#' },
        { title: 'Status', url: '#' },
        { title: 'Terms', url: '#' },
        { title: 'Privacy', url: '#' },
    ];

    return (
        <section className="mt-10 py-10 bg-purple-950 w-full">
            <div className="px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16 gap-x-30 ">

                    {/* Use Eventbrite */}
                    <div>

                        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Use Eventbrite</p>
                        <ul className="mt-6 space-y-4">
                            {eventLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.url}  // Use the url from the object
                                        className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>

                    </div>

                    {/* Plan events */}
                    <div>
                        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Plan events</p>
                        {eventLinks2.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}  // Use the url from the object
                                    className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </div>

                    {/* Find Events */}
                    <div>
                        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Find Events</p>
                        {eventLinks3.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}  // Use the url from the object
                                    className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </div>

                    {/* Contact With Us */}
                    <div>
                        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase"> Contact With Us </p>
                        {eventLinks4.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}  // Use the url from the object
                                    className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                        <ul className="flex items-center space-x-3 mt-9">
                            <li>
                                <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                <FaSquareXTwitter />
                                </a>
                            </li>

                            <li>
                                <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                <FaFacebook />
                                </a>
                            </li>

                            <li>
                                <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                <FaLinkedin />
                                </a>
                            </li>

                            <li>
                                <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                <FaSquareInstagram />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="w-full flex flex-col items-center ">

                    <nav className="flex justify-end mt-12 gap-4 w-full">
                        <div className="px-4 sm:px-1 lg:px-1">
                            <ul className="flex space-x-4 py-4">
                                <li> <p className="text-sm text-center text-gray-300 mb-0 pr-28">© 2024 Eventbrite,</p></li>
                                {eventLinks5.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.url}
                                            className="text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>

                <hr className="mt-16 mb-0 border-gray-200" />

            </div>
        </section>
    );
};

export default Footer;
