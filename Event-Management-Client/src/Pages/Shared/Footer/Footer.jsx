import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800  mt-8">
      <div className="py-8 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-white">
            <p className="text-sm mt-4">
              58 West Dhanmondi
              <br />
              Dhaka, Banglades
            </p>
            <div className="flex mt-4">
              <a className="text-white mr-4">
                <FaFacebook />
              </a>
              <a className="text-white mr-4">
                <FaInstagram />
              </a>
              <a className="text-white">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4">ABOUT S&K</h3>
            <ul className="text-sm">
              <li>Philosophy</li>
              <li>Jobs</li>
              <li>Press</li>
              <li>FAQs</li>
              <li>Events</li>
            </ul>
          </div>

          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4">HELPFUL LINKS</h3>
            <ul className="text-sm">
              <li>Financial Aid</li>
              <li>Using Bright Horizons Back-Up Care</li>
              <li>Email List</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4">OUR Services</h3>
            <ul className="text-sm">
              <li>Wedding events</li>
              <li>Birthday events</li>
              <li>Other party events</li>
            </ul>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Eventease. All rights
          reserved.{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
