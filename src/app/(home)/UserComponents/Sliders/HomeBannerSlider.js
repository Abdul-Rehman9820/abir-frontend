import Link from "next/link";
import Slideshow from "./SlideshowCommon";

const slidesWithHtml = [
  {
    customContent: (
      <div className="banner-area">
        {/* <img className="banBG1" src="/assets/images/home-one-bg.jpg" alt="" /> */}
        <img className="banBG1" src="/custom_images/Home/home1.jpg" alt="" />
        <div className="container mx-auto">
          <div
            className="banner-content wow animate__animated animate__fadeInUp"
            data-wow-delay="00ms"
            data-wow-duration="1000ms"
          >
            <span
              className="tophead wow animate__animated animate__fadeInLeft"
              data-wow-delay="100ms"
              data-wow-duration="1000ms"
            >
              Nourish Your Body, <b>Transform</b> Your Life
            </span>
            <p
              className="wow animate__animated animate__fadeInLeft"
              data-wow-delay="200ms"
              data-wow-duration="1000ms"
            >
             Nourish your body with whole foods and balanced meals. Simple dietary changes can boost energy and enhance your overall health
            </p>
            <Link
              href="/recipes-pdf"
              className="default-btn wow animate__animated animate__fadeInLeft"
              data-wow-delay="300ms"
              data-wow-duration="1200ms"
            >
              Check It Out
            </Link>
            <div className="banner-shape">
              <img src="assets/images/shape/shape1.png" alt="Banner Images" />
              <img src="assets/images/shape/shape2.png" alt="Banner Images" />
              <img src="assets/images/shape/shape3.png" alt="Banner Images" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    customContent: (
      <div className="banner-area">
        {/* <img className="banBG1" src="/assets/images/home-two-bg.jpg" alt="" /> */}
        <img className="banBG1" src="/custom_images/Home/home2.jpg" alt="" />
        <div className="container mx-auto">
          <div
            className="banner-content wow animate__animated animate__fadeInUp"
            data-wow-delay="00ms"
            data-wow-duration="1000ms"
          >
            <span
              className="tophead wow animate__animated animate__fadeInLeft"
              data-wow-delay="100ms"
              data-wow-duration="1000ms"
            >
              Balance Your Diet, <b>Balance</b> Your Life 
            </span>
            <p
              className="wow animate__animated animate__fadeInLeft"
              data-wow-delay="200ms"
              data-wow-duration="1000ms"
            >
             Balance your diet by including a variety of food groups. This approach not only improves nutrition but also promotes overall well-being.
            </p>
            <Link
              href="/recipes-pdf"
              className="default-btn wow animate__animated animate__fadeInLeft"
              data-wow-delay="300ms"
              data-wow-duration="1200ms"
            >
              Check It Out
            </Link>
            <div className="banner-shape">
              <img src="assets/images/shape/shape1.png" alt="Banner Images" />
              <img src="assets/images/shape/shape2.png" alt="Banner Images" />
              <img src="assets/images/shape/shape3.png" alt="Banner Images" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  
];

export default function HomeBannerSlider() {
  return (
    <>
      <Slideshow slidesData={slidesWithHtml} />
    </>
  );
}
