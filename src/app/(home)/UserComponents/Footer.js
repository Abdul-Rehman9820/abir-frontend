import Link from 'next/link';
import "../usercomponets_styles/footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-area footer-area-bg">
        <div className="container mx-auto">
          <div className="footer-top py-8">


            <div className="footer_cont">

              <div className="footer_box">
                <div className="footer-widget pe-8">
                  <div className="footer-logo">
                    <Link href="/">
                      <img src="/custom_images/Abillogo_transparent.png" alt="Images" />
                    </Link>
                  </div>
                  <p>
                  Every step forward is progress. Believe in yourself, stay focused, and keep going you’re closer to your goals with each choice you make!
                  </p>
                  {/* <ul className="social-link">
                    <li>
                      <Link href="https://www.facebook.com/" >
                        <i className="bx bxl-facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.linkedin.com/" >
                        <i className="bx bxl-linkedin" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.pinterest.com/" >
                        <i className="bx bxl-pinterest-alt" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.instagram.com/" >
                        <i className="bx bxl-instagram" />
                      </Link>
                    </li>
                  </ul> */}
                </div>
              </div>

              <div className="footer_box">
                <div className="footer-widget ps-5">
                  <h3>Useful Links</h3>
                  <ul className="footer-list">
                    <li>
                      <Link href="/" >                       
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="about" >              
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="" >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="" >
                        Terms & Condition
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer_box">
                <div className="footer-widget ps-5">
                  <h3>Information</h3>
                  <ul className="footer-contact">
                    <li>
                      Phone:
                      <span>
                        <Link href="tel:8245678924">+8245678924</Link>
                      </span>
                    </li>
                   
                    <li>
                      Address:
                      <span>
                        5ut, Stamford South,
                        <br />
                        U.S.A
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer_box">
                <div className="footer-widget ps-5">
                  <h3>Newsletter</h3>
                  <p>
                    Get nutrition tips, wellness insights, and updates straight to your inbox.
                  </p>
                  <div className="newsletter-area">
                    <form
                      className="newsletter-form"
                      data-toggle="validator"
                      method="POST"
                    >
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Your Email"
                        name="EMAIL"
                        required=""
                        autoComplete="off"
                      />
                      <button className="subscribe-btn" type="submit">
                        Subscribe
                      </button>
                      <div id="validator-newsletter" className="form-result" />
                    </form>
                  </div>
                </div>
              </div>

            </div>


          </div>
        </div>
        <div className="copyright-area">
          <div className="container mx-auto">
            <div className="copy-right-text text-center">
              <p>
                Copyright @ Abir Life. Designed & Powered By <Link href="https://mindframeglobal.com/" >  Mind Frame Global</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
      
    </>
  );
};
export default Footer;
