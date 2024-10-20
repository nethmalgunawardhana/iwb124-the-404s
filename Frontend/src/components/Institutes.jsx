import React, { useRef, useState } from "react";
import "../App.css";

function Institutes() {
  const SAMPLE_DATA = [
    {
      id: "University of Moratuwa",
      url: "https://www.yesman.lk/assets/img/institutes/uom_cover-1557562542.jpg",
      link: "#",
    },
    {
      id: "University of Colombo",
      url: "https://i0.wp.com/studentlanka.com/wp-content/uploads/2007/04/University-of-Colombo-sri-lanka.jpg?w=906&ssl=1",
      link: "#",
    },
    {
      id: "University of Peradeniya",
      url: "https://eng.pdn.ac.lk/wp-content/uploads/2022/12/slide-4.jpg",
      link: "#",
    },
    {
      id: "University of Ruhuna",
      url: "https://www.ruh.ac.lk/images/2020/02/18/history2.jpg",
      link: "#",
    },
    {
      id: "University of Sabaragamuwa",
      url: "https://fastly.4sqi.net/img/general/width960/7547358_ff9JZZjVoZWGKOJVWy1YGmJ5SjDilCN0FYuJUqIYdWk.jpg",
      link: "#",
    },
    {
      id: "University of Jaffna",
      url: "https://th-i.thgim.com/public/news/international/tdiuj3/article53536394.ece/alternates/LANDSCAPE_1200/universityofjaffna1jpg",
      link: "#",
    },
    {
      id: "University of Kelaniya",
      url: "https://fct.kln.ac.lk/media/2024/05/14/img_5222.jpg",
      link: "#",
    },
    {
      id: "University of Sri Jayawardanapura",
      url: "https://archives1.dailynews.lk/sites/default/files/news/2022/01/03/07-JPura-01.jpg",
      link: "#",
    },
    {
      id: "Uva Wellassa University",
      url: "https://www.uwu.ac.lk/eag/images/ami/im3.jpg",
      link: "#",
    },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();

  // Function to handle scrolling when the button is clicked
  const handleScroll = (scrollAmount) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pr-5 pl-5 pb-10">
      <div className="flex justify-end mt-12 gap-4 w-full pr-5 mb-5 bg-purple-100 rounded-full">
        <div className="flex items-center justify-start  w-full">
          <span className="text-[30px] text-black font-bold pl-9">
            Institutes
          </span>
        </div>
        <button
          onClick={() => handleScroll(-200)}
          className="text-[15px] font-medium text-[#000000] bg-purple-400 rounded-full px-6 py-2 my-5 border-none cursor-pointer transition duration-500 ease-in-out hover:text-white hover:bg-purple-600"
        >
          &lt;
        </button>
        <button
          onClick={() => handleScroll(200)}
          className="text-[15px] font-medium text-[#002d36] bg-purple-400 rounded-full px-6 py-2 my-5 border-none cursor-pointer transition duration-500 ease-in-out hover:text-white hover:bg-purple-600"
        >
          &gt;
        </button>
      </div>

      <div
        ref={containerRef}
        className="scroll-container w-full overflow-x-scroll scroll-smooth"
      >
        <div className="w-full flex gap-5">
          {SAMPLE_DATA.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="w-[350px] h-[225px] rounded-tl-[70px] rounded-tr-[70px] flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${item.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="absolute bottom-2 left-2 text-[20px] font-semibold text-white  opacity-100 p-2 rounded">
                  {item.id}
                  <div className="w-full h-[10px] bg-purple-700 mt-1"></div>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Institutes;
