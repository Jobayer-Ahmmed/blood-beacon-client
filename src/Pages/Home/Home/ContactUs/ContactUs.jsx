import {SiMinutemailer} from "react-icons/si"
import {FaFacebookSquare, FaPhone, FaTwitterSquare} from "react-icons/fa"
import { Link } from "react-router-dom"

const ContactUs = () => {
  return (
    <div className="my-xPadding">
      <div>
        <div className="flex justify-center">
          <div>
            <h1 className="text-3xl font-medium text-center">Contact Us</h1>
            <div className="mt-3 mb-6 w-60 h-[2px] bg-red-200"></div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:gap-32">
          <div>
            <p className="text-xl text-gray-600 font-medium mb-2"><SiMinutemailer className="inline mr-2"/> info@bloodbeacon.com</p>
            <p className="text-xl text-gray-600 font-medium"><FaPhone className="inline mr-2"/>+8801xxxxxxxxx</p>
          </div>
          <div className="mt-6 md:mt-0">
            <h3 className="text-2xl text-gray-600 font-medium mb-4">Join Us On</h3>
            <div className="flex justify-evenly">
              <Link to="https://web.facebook.com/" target="blank" className="text-2xl"><FaFacebookSquare/></Link>
              <Link to="https://twitter.com/" target="blank" className="text-2xl"><FaTwitterSquare/></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs