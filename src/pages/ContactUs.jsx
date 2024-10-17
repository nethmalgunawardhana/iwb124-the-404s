
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import * as Icon from 'react-feather';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
  
    const nameHandler = (e) => setName(e.target.value);
    const emailHandler = (e) => setEmail(e.target.value);
    const phoneHandler = (e) => setPhone(e.target.value);
    const messageHandler = (e) => setMessage(e.target.value);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setButtonLoading(true);
  
      // Prepare the form data
      const formData = {
        access_key: 'aaeb199b-246f-4ac4-8618-a59d31e3299d',
        name,
        email,
        phone,
        message,
      };
  
      try {
        // Send form data to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const res = await response.json();
  
        if (res.success) {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
              });
  
          // Clear form fields
          setName('');
          setEmail('');
          setPhone('');
          setMessage('');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
        }
      } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            
          });
      } finally {
        setButtonLoading(false);
      }
    };
  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-200 pb-12">
      <div className="flex flex-col mt-10">
        <b className="text-[30px] text-[rgb(4,4,59)] text-center">
          Contact US
        </b>
        <p className="text-[15px] text-[rgb(4,4,34)] text-center">
          Any Question or remarks? Just write us a message
        </p>
      </div>
      <div className="w-[70%] bg-white p-[5px] rounded-md h-[70vh] md:w-[90%] grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact Information Section */}
        <div className="bg-purple-900 rounded-md relative p-[30px] flex flex-col items-center pb-[100px] max-sm:pb-[80px]">
          <div className="flex flex-col items-center">
            <p className="text-center text-white text-lg font-bold">
              Contact Information
            </p>
            <p className="text-center text-white text-xs leading-[18px]">
              Fill up the form and our team will get back to you within 24 hours
            </p>
          </div>
          {/* Contact details */}
          <div>
            <a href='#' className="flex w-[200px] h-[10px] mt-12 cursor-pointer no-underline">
              <Icon.Phone size={20} color="rgb(252, 113, 137)" />
              <div className="text-white text-[15px] ml-2.5">+94 77 12 34 567</div>
            </a>
            <a href='#' className="flex w-[200px] h-[10px] mt-12 cursor-pointer no-underline">
              <Icon.Mail size={20} color="rgb(252, 113, 137)" />
              <div className="text-white text-[15px] ml-2.5">eventbright@gmail.com</div>
            </a>
          </div>
          <br /><br />
          <div>
            <div className="h-[50px] w-[50px] mt-7 ml-2.5 bg-[rgb(124,17,224)] rounded-full z-20"></div>
            <div className="absolute ml-2.5 bg-[rgb(246,146,163)] rounded-full h-[30px] w-[30px]"></div>
          </div>
          {/* Social media icons */}
          <div className="flex justify-center h-[10px] absolute bottom-[30px] cursor-pointer">
            <a href='https://www.facebook.com/' target='_blank' className="w-[35px] h-[35px] rounded-full flex justify-center items-center hover:bg-[rgb(252,113,137)]">
              <Icon.Facebook color="#fff" size={20} />
            </a>
            <a href='https://instagram.com/' target='_blank' className="w-[35px] h-[35px] rounded-full flex justify-center items-center hover:bg-[rgb(252,113,137)]">
              <Icon.Instagram color="#fff" size={20} />
            </a>
            <a href='https://linkedin.com' target='_blank' className="w-[35px] h-[35px] rounded-full flex justify-center items-center hover:bg-[rgb(252,113,137)]">
              <Icon.Linkedin color="#fff" size={20} />
            </a>
          </div>
        </div>
        {/* Form Section */}
        <form onSubmit={handleSubmit } className="h-auto pb-[100px] relative p-[10px] flex flex-col justify-between">
          <div className="border-2 border-transparent w-[90%] pl-[10px] flex flex-col">
            <p className="text-black">Name</p>
            <input
              className="text-[#333] bg-white w-full text-[15px] p-[8px] border-b-2 border-b-[rgb(100,21,173)] border-l-0 border-r-0 border-t-0 outline-none"
              type="text"
              placeholder="Navoda Chathurya"
              value={name}
              onChange={nameHandler}
              name='name'
              required
            />
          </div>
          <div className="border-2 border-transparent w-[90%] pl-[10px] flex flex-col">
            <p className="text-black">Email</p>
            <input
              className="text-[#333] bg-white w-full text-[15px] p-[8px] border-b-2 border-b-[rgb(100,21,173)] border-l-0 border-r-0 border-t-0 outline-none"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={emailHandler}
              name='email'
              required
            />
          </div>
          <div className="border-2 border-transparent w-[90%] pl-[10px] flex flex-col">
            <p className="text-black">Phone</p>
            <input
              className="text-[#333] bg-white w-full text-[15px] p-[8px] border-b-2 border-b-[rgb(100,21,173)] border-l-0 border-r-0 border-t-0 outline-none"
              type="text"
              placeholder="+94 77 77 77 777"
              value={phone}
              onChange={phoneHandler}
              name='phone'
              required
            />
          </div>
          <div className="border-2 border-transparent w-[90%] pl-[10px] flex flex-col">
            <p className="text-black">Message</p>
            <textarea
              className="w-full bg-white text-[#333] text-[15px] p-[10px] border-b-2 border-b-[rgb(100,21,173)] border-l-0 border-r-0 border-t-0 outline-none"
              placeholder="Write your message"
              value={message}
              onChange={messageHandler}
              name='message'
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`absolute bottom-[20px] right-[20px] p-[10px] text-white border-none rounded-md px-[24px] py-[12px] cursor-pointer ${
              buttonLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-900 hover:text-slate-800 hover:bg-purple-300'
            }`}
            disabled={buttonLoading}
          >
            {buttonLoading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
