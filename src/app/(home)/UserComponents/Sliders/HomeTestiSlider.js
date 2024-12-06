import Link from "next/link";
import Slideshow from "./SlideshowCommon";

const slidesWithHtml = [
  {
    customContent: (
      <div className="testimonials-item">
      <div className="section-title text-center">
        <span>Testimonial</span>
        <h2>Customer Satisfaction</h2>
      </div>
      <i className="bx bxs-quote-left" />
      <p>
      Abir Life has been such a positive addition to my health journey. The diet plans are tailored perfectly to my needs, 
      making it easy to follow and stay on track. I especially love the recipe videos they’re simple, quick, and make healthy eating enjoyable. 
      I’ve never felt this good, and I’m excited to keep going!  
      </p>
      <div className="content">
        <h3>Luca Travis</h3>
        <img className="hometie_img" src="/custom_images/testimon_img.webp" alt="img" />
      </div>
    </div>
    ),
  },
  {
    customContent: (
      <div className="testimonials-item">
      <div className="section-title text-center">
        <span>Testimonial</span>
        <h2>Customer Satisfaction</h2>
      </div>
      <i className="bx bxs-quote-left" />
      <p>
      I’m so grateful for Abir Life. I’ve tried many diet programs in the past, but this one feels sustainable and actually enjoyable. 
      The meal plans are perfectly personalized, and the recipe videos make it easy to create meals that my whole family loves. I’m finally seeing real results!
      </p>
      <div className="content">
        <h3>Michael Jason</h3>
        <img className="hometie_img" src="/custom_images/testimon_img.webp" alt="img" />
      </div>
    </div>
    ),
  },
  
];

export default function HomeTestiSlider() {
  return (
    <>
      <Slideshow slidesData={slidesWithHtml} />
    </>
  );
}
