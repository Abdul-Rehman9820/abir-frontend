
import Link from "next/link";

export default function About() {
  return (
    <>

      {/* <div className="py-5 bg-slate-100">
        <div className="container mx-auto">
       
            <ul className="flex">
              <li className="mr-2">
                <a href="index.html">Home /</a>
              </li>
              <li>About Us</li>
            </ul>
      
        </div>
      </div> */}

      <div className="about-area-two py-14">
        <div className="container mx-auto">
          <div className="flex flex-row items-center">

            <div className="about_imag_cont w-1/2">        
              <div className="about-content-two">
                <div className="section-title">
                  <span>About Us</span>
                  <h2>Discover Your Healthier Life with Abir Life</h2>
                  <p>
                  At Abir Life, we believe that everyone deserves to lead a healthy and fulfilling life. 
                  Our mission is to provide you with the tools and resources you need to achieve your health goals. 
                  With our personalized diet plans, you'll receive tailored guidance that fits your lifestyle and preferences.
                  </p>
                  <p>
                  Our easy-to-follow recipe videos make healthy cooking enjoyable and accessible, ensuring you can nourish your body without sacrificing flavor. 
                  By joining our supportive community, you'll connect with others on similar journeys, sharing tips and motivation along the way. 
                  Together, let’s embark on a path to better health, one delicious meal at a time!
                  </p>
                </div>
                {/* <div className="row">
                  <div className="col-lg-6">
                    <div className="about-content-item">
                      <i className="flaticon-diet" />
                      <h3>Personalized Nutrition Plan</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-content-item">
                      <i className="flaticon-exercise" />
                      <h3>Personalized Exercises Plan</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor{" "}
                      </p>
                    </div>
                  </div>
                </div> */}
                <Link href="contact" className="default-btn">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="imagebox_about w-1/2">
              <div className="about-img pl-2">
                <img src="assets/images/about/new-about.jpeg" alt="Images" />
              </div>
            </div>
          </div>


        </div>
        <div className="about-shape-two">
          <img src="assets/images/shape/shape2.png" alt="About Images" />
          <img src="assets/images/shape/shape3.png" alt="About Images" />
        </div>
      </div>
    </>
  );
}
