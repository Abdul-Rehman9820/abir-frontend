import Link from "next/link";
import Image from "next/image";


import "./usercomponets_styles/home_style.css";


import HomeBannerSlider from "./UserComponents/Sliders/HomeBannerSlider";
import HomeTestiSlider from "./UserComponents/Sliders/HomeTestiSlider";

import RecipeTab from "./UserComponents/homeComponent/recipeTab";
import VideoTab from "./UserComponents/homeComponent/videoTab";
import PackageTab from "./UserComponents/homeComponent/packageTab";

export default function Home() {
  return (
    <>
      {/* slider */}
      <div className="banner-area-cont">

        <div className="bannercont">

          <div className="banBox1">
            <img
              className="logo-slider"
              src="/custom_images/Abillogo_transparent.png"
              alt="logo"
            />
          </div>
          <div className="banBox2">
            <HomeBannerSlider />
          </div>

        </div>

      </div>
      {/* slider */}

      {/* banner bottom top category */}
      <div className="banner-bottom-area py-14">
        <div className="container mx-auto">
          <div className="banner-bottom-card-Cont">
            <div className="banner-bottom-box">
              <div className="banner-bottom-card">
                {/* <i className="flaticon-calendar-1" /> */}
                <div className="h_imgbox">
                  <img src="/custom_images/Home/recipe_PDF.jpg" alt="abir life" />
                </div>
                <h3>Healthy Recipes</h3>
                <p>
                  Recipes which offer delicious, nutrient-packed meals that fuel your body, boost energy, and support wellness.
                </p>
                <Link href="/recipes-pdf" className="learn-btn">
                  See More
                </Link>
              </div>
            </div>
            <div className="banner-bottom-box">
              <div className="banner-bottom-card">
                {/* <i className="flaticon-diet" /> */}
                <div className="h_imgbox">
                  <img src="/custom_images/Home/helth_recip_img.webp" alt="abir life" />
                </div>
                <h3>Recipes Videos</h3>
                <p>
                  Our recipe videos offer easy-to-follow steps, helping you create delicious dishes from scratch with expert guidance.
                </p>
                <Link href="/recipes-videos" className="learn-btn">
                  See More
                </Link>
              </div>
            </div>
            <div className="banner-bottom-box">
              <div className="banner-bottom-card">
                {/* <i className="flaticon-plan" /> */}
                <div className="h_imgbox">
                  <img src="/custom_images/Home/recipe_Packages.webp" alt="abir life" />
                </div>
                <h3>Health Packages</h3>
                <p>
                  Our health packages include personalized plans, PDFs, and videos to support your wellness journey.
                </p>
                <Link href="/packages" className="learn-btn">
                  See More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* banner bottom top category */}

      {/* about us */}
      <div className="about-area py-14">
        <div className="container mx-auto">
          <div className="about_cont">
            <div className="about_box">
              <div className="about-content">
                <div className="section-title">
                  <span>About Us</span>
                  <h2>
                    Accept Wellness In Your Life With <b>Abir Life</b>
                  </h2>
                  <p>
                    At Abir Life, we believe that nourishing your body is the key to unlocking your best self.
                    Our mission is to provide you with the resources, guidance, and support you need to embark on a transformative journey toward better health and well-being.
                    Whether you're looking to lose weight, enhance your energy levels, or simply adopt healthier eating habits, we are here to help you every step of the way.
                  </p>
                  <p>
                    We are dedicated to creating a vibrant community that inspires and motivates you to embrace a healthier lifestyle.
                    Together, let's cultivate a nourishing environment where health thrives and lasting change is achievable.
                  </p>
                </div>



                <div className="flex mt-4">
                  <Link className="default-btn" href="/about">Read More</Link>
                </div>

              </div>
            </div>
            <div className="about_box">
              {/* <div className="about-play-btn">
                <Link
                  href="https://www.youtube.com/watch?v=Zd00oIDAt60"
                  className="play-btn"
                >
                  <i className="bx bxs-right-ar" />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="about-shape">
          <img
            src="assets/images/about/about-bg-shape.png"
            alt="About Images"
          />
          <img src="assets/images/shape/shape1.png" alt="About Images" />
          <img src="assets/images/shape/shape2.png" alt="About Images" />
          <img src="assets/images/shape/shape3.png" alt="About Images" />
        </div> */}
      </div>
      {/* about us */}

      {/* RecipeTab */}
      <div className="diet-plan-area py-14">
        <div className="container mx-auto">
          <div className="section-title text-center">
            <span>Diet Recipes</span>
            <h2>Our Best Diet Recipes</h2>
          </div>

          {/* Package Tab main */}
          <RecipeTab />

        </div>

        <div className="flex justify-center mt-2">
          <Link className="default-btn" href="/recipes-pdf">View More</Link>
        </div>

      </div>
      {/* RecipeTab */}


      {/* videos */}
      <div className="blog-area py-14">
        <div className="container mx-auto">
          <div className="section-title text-center">
            <span>Recipe Videos</span>
            <h2>Latest Recipe Videos</h2>
          </div>


          <VideoTab />


        </div>
      </div>
      {/* videos */}

      {/* packages */}
      <div className="pricing-area py-14">
        <div className="container mx-auto">
          <div className="section-title text-center">
            <span>Diet Plan</span>
            <h2>Choose Your Best Plan</h2>
          </div>

          {/* <div className="BestPlan_cont  pt-5">
            <div className="BestPlan_box">
              <div className="pricing-card">
                <div className="pricing-title">
                  <h3>$25</h3>
                  <span>Starter</span>
                </div>
                <ul>
                  <li>
                    <i className="bx bx-check" /> 20 Workouts
                  </li>
                  <li>
                    <i className="bx bx-check" /> Meal Plans &amp; Analysis
                  </li>
                  <li>
                    <i className="bx bx-check" /> Weight Assessment
                  </li>
                  <li>
                    <i className="bx bx-check" /> Physical Activities
                  </li>
                  <li>
                    <i className="bx bx-check" /> Client Monitoring
                  </li>
                  <li>
                    <i className="bx bx-check" /> 24/7 Support
                  </li>
                </ul>
                <div className="price-btn-area text-center">
                  <Link href="pricing.html" className="default-btn">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="BestPlan_box">
              <div className="pricing-card">
                <div className="pricing-title">
                  <h3>$45</h3>
                  <span>Advance</span>
                </div>
                <ul>
                  <li>
                    <i className="bx bx-check" /> 24 Workouts
                  </li>
                  <li>
                    <i className="bx bx-check" /> Meal Plans &amp; Analysis
                  </li>
                  <li>
                    <i className="bx bx-check" /> Weight Assessment
                  </li>
                  <li>
                    <i className="bx bx-check" /> Physical Activities
                  </li>
                  <li>
                    <i className="bx bx-check" /> Client Monitoring
                  </li>
                  <li>
                    <i className="bx bx-check" /> 24/7 Support
                  </li>
                </ul>
                <div className="price-btn-area text-center">
                  <Link href="pricing.html" className="default-btn">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="BestPlan_box">
              <div className="pricing-card">
                <div className="pricing-title">
                  <h3>$45</h3>
                  <span>Premium</span>
                </div>
                <ul>
                  <li>
                    <i className="bx bx-check" /> 30 Workouts
                  </li>
                  <li>
                    <i className="bx bx-check" /> Meal Plans &amp; Analysis
                  </li>
                  <li>
                    <i className="bx bx-check" /> Weight Assessment
                  </li>
                  <li>
                    <i className="bx bx-check" /> Physical Activities
                  </li>
                  <li>
                    <i className="bx bx-check" /> Client Monitoring
                  </li>
                  <li>
                    <i className="bx bx-check" /> 24/7 Support
                  </li>
                </ul>
                <div className="price-btn-area text-center">
                  <Link href="pricing.html" className="default-btn">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div> */}

          {/* Recipe Tab main */}
          <PackageTab />

          <div className="flex justify-center mt-2">
            <Link className="default-btn" href="/recipes-pdf">View More</Link>
          </div>

        </div>
        {/* <div className="pricing-shape">
          <img src="assets/images/shape/shape4.png" alt="Pricing Shape" />
        </div> */}
      </div>
      {/* packages */}


      {/* contact us */}
      <div className="appointment-area py-14">
        <div className="container mx-auto">
          <div className="appointment-form">
            <h2>Make an Appointment</h2>
            <form>
              <div className="">
                <div className="">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required=""
                      data-error="Please Enter Your Name"
                      placeholder="Name*"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      required=""
                      data-error="Please Enter Your Email"
                      placeholder="Email*"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form-group">
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      required=""
                      data-error="Please Enter Your Phone Number"
                      placeholder="Phone*"
                    />
                  </div>
                </div>

                <div className="">
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      required=""
                      data-error="Please Enter Your Subject"
                      placeholder="Subject"
                    />
                  </div>
                </div>

                <div className=" ">
                  <div className="form-group">
                    <textarea
                      name="message"
                      className="form-control"
                      id="message"
                      cols={30}
                      s={5}
                      required=""
                      data-error="Write your message"
                      placeholder="Your Message"
                      defaultValue={""}
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
                <div className=" ">
                  <button type="submit" className="default-btn">
                    Submit Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* contact us */}

      {/* something about us */}
      <div className="event-area py-14">
        <div className="container mx-auto">
          <div className="event-content-container">
            <div className="event-content-box">
              <div className="event-content pr-4">
                <div className="section-title">
                  <span>Healthy Living</span>
                  <h2>
                    Nutrition, Tailored for You.
                  </h2>
                </div>
                <div className="">
                  <div className="">
                    <div className="content">
                      <div className="event-date">
                        <h2>
                          1
                        </h2>
                        <img
                          src="assets/images/event/event-bg.webp"
                          alt="Images"
                        />
                      </div>
                      <h3>
                        Personalized Meal Plans
                      </h3>
                      <p>
                        Tailored to meet your specific dietary needs, preferences, and goals, ensuring you enjoy every bite while staying on track.
                      </p>

                    </div>
                  </div>

                  <div className="">
                    <div className="content">
                      <div className="event-date">
                        <h2>
                          2
                        </h2>
                        <img
                          src="assets/images/event/event-bg.webp"
                          alt="Images"
                        />
                      </div>
                      <h3>
                        Holistic Approach
                      </h3>
                      <p>
                        Our programs focus on overall well-being, addressing not just diet but also lifestyle, mental health, and physical activity.
                      </p>

                    </div>
                  </div>

                  <div className="">
                    <div className="content">
                      <div className="event-date">
                        <h2>
                          3
                        </h2>
                        <img
                          src="assets/images/event/event-bg.webp"
                          alt="Images"
                        />
                      </div>
                      <h3>
                        Expert Nutrition Coaching
                      </h3>
                      <p>
                        Work one-on-one with best nutritionists who provide personalized advice, motivation, and accountability.
                      </p>

                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="event-content-box">
              <div className="event-img">
                <img src="assets/images/event/event-img.jpg" alt="Images" />
                {/* <div className="sub-img">
                  <img
                    src="assets/images/event/event-sub-img.png"
                    alt="Images"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* something about us */}

      {/* testimoials */}
      <div className="testimonials-area py-14">
        <div className="container mx-auto">
          <div className="testimonials-slider owl-carousel owl-theme">

            <HomeTestiSlider />
            {/* <div className="testimonials-item">
              <div className="section-title text-center">
                <span>Testimonials</span>
                <h2>Customer Satisfaction</h2>
              </div>
              <i className="bx bxs-quote-left" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis. labore et dolore magna
                aliqua quis ipsum
              </p>
              <div className="content">
                <h3>Selina Gomez</h3>
                <span>Artist</span>
              </div>
            </div> */}


          </div>
        </div>
      </div>
      {/* testimoials */}


    </>
  );
}
