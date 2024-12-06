
export default function Contact() {
  return (
    <>
      <div className="contact-area py-14">
        <div className="container mx-auto">
          <div className="flex">
            <div className="w-1/3">
              <div className="contact-info">
                <span>Contact Info</span>
                <h2>Let's Connect With Us</h2>
         
                <ul>
                  <li>
                    <div className="content">
                      <i className="bx bx-phone-call" />
                      <h3>Phone Number</h3>
                      <a href="tel:8245678924">+8245678924</a>
                    </div>
                  </li>
                  <li>
                    <div className="content">
                      <i className="bx bxs-map" />
                      <h3>Address</h3>
                      <span>5ut, Stamford South, Newzeland</span>
                    </div>
                  </li>
                  <li>
                    <div className="content">
                      <i className="bx bx-message" />
                      <h3>Contact Info</h3>
                      <a href="https://templates.hibootstrap.com/cdn-cgi/l/email-protection#c2aaa7aeaead82a3b0b0adaea3eca1adaf">
                        <span
                          className="__cf_email__"
                          data-cfemail="a3cbc6cfcfcce3c2d1d1cccfc28dc0ccce"
                        >
                          [email&nbsp;protected]
                        </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-2/3">
              <div className="contact-form">
                <h3>Contact With Us!</h3>
                <form id="contactForm">
                  <div className="flex flex-row flex-wrap">
                    <div className="w-1/2">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          required=""
                          data-error="Please Enter Your Name"
                          placeholder="Name*"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          required=""
                          data-error="Please Enter Your Email"
                          placeholder="Email*"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="form-group">
                        <input
                          type="text"
                          name="phone_number"
                          id="phone_number"
                          required=""
                          data-error="Please Enter Your number"
                          className="form-control"
                          placeholder="Phone Number*"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="form-group">
                        <input
                          type="text"
                          name="msg_subject"
                          id="msg_subject"
                          className="form-control"
                          required=""
                          data-error="Please Enter Your Subject"
                          placeholder="Your Subject*"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="form-group">
                        <textarea
                          name="message"
                          className="form-control"
                          id="message"
                          cols={30}
                          rows={5}
                          required=""
                          data-error="Write your message"
                          placeholder="Your Message*"
                          defaultValue={""}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
         
                    <div className="w-full">
                      <button type="submit" className="default-btn">
                        Send Message
                      </button>
                      <div id="msgSubmit" className="h3 text-center hidden" />
                      <div className="clearfix" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
