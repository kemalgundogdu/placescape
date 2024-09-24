import React, { useState, useEffect } from "react";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const pageDiv = document.querySelector(".page");
    if (pageDiv) {
      pageDiv.scrollTop = 0;
    }
  };

  const toggleVisibility = () => {
    const pageDiv = document.querySelector(".page");
    if (pageDiv && pageDiv.scrollTop > 600) { // 200px'den fazla kaydırıldıysa
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const pageDiv = document.querySelector(".page");
    
    if (pageDiv) {
      pageDiv.addEventListener("scroll", toggleVisibility); // .page scroll event dinleyici ekle
    }

    return () => {
      if (pageDiv) {
        pageDiv.removeEventListener("scroll", toggleVisibility); // Temizleme işlemi
      }
    };
  }, []);

  return (
    <>
      {isVisible && ( // Buton sadece isVisible true olduğunda görünür olacak
        <button
          onClick={handleScroll}
          className="px-3 py-2 bg-[#4B0097] hover:opacity-80 transition-opacity rounded-lg text-xs text-white fixed bottom-10 right-10 z-30"
        >
          Back to up
        </button>
      )}
    </>
  );
}

export default Footer;