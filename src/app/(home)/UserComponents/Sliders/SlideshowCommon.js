"use client";

import { useRef, useState, useEffect } from "react";
import "../../usercomponets_styles/sliders.css";

export default function Slideshow({ slidesData }) {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesRef = useRef(null);
  const dotsRef = useRef(null);
  const autoSlideInterval = 10000; // Set auto-slide interval in milliseconds (e.g., 5000ms = 5 seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev >= slidesData.length ? 1 : prev + 1));
    }, autoSlideInterval);

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [slidesData]);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex, slidesData]);

  const showSlides = (n) => {
    let i;
    const slides = slidesRef.current?.getElementsByClassName("mySlides");
    const dots = dotsRef.current?.getElementsByClassName("dot");

    if (!slides || !dots) return;

    if (n > slides.length) setSlideIndex(1);
    if (n < 1) setSlideIndex(slides.length);

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activeSlideDot", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " activeSlideDot";
  };

  const plusSlides = (n) => {
    setSlideIndex((prev) => {
      const newIndex = prev + n;
      return newIndex > slidesData.length ? 1 : newIndex < 1 ? slidesData.length : newIndex;
    });
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <>
      <div className="slideshow-container" ref={slidesRef}>
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`mySlides fade ${slideIndex === index + 1 ? "activeSlide" : ""}`}
            style={{ display: slideIndex === index + 1 ? "block" : "none" }}
          >
            <div className="sledinner">{slide.customContent}</div>
          </div>
        ))}

        <a 
          className={`prev ${slideIndex === 1 ? "disabled" : ""}`} 
          onClick={() => plusSlides(-1)} 
          aria-disabled={slideIndex === 1}
        >
          ❮
        </a>
        <a 
          className={`next ${slideIndex === slidesData.length ? "disabled" : ""}`} 
          onClick={() => plusSlides(1)} 
          aria-disabled={slideIndex === slidesData.length}
        >
          ❯
        </a>
      </div>

      <div style={{ textAlign: "center" }} className="slideDot" ref={dotsRef}>
        {slidesData.map((_, index) => (
          <span
            key={index}
            className={`dot ${slideIndex === index + 1 ? "activeSlideDot" : ""}`}
            onClick={() => currentSlide(index + 1)}
          ></span>
        ))}
      </div>

      <style jsx>{`
        .disabled {
          color: grey;
          pointer-events: none; /* Disable pointer events */
          opacity: 0.5; /* Change opacity for visual effect */
        }
      `}</style>
    </>
  );
}
