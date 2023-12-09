import footerImg from "../../../assets/logos/bloodbeacon.png"

const Footer = () => {
  return (
    <div>
        <footer className="footer p-10 bg-neutral text-neutral-content flex justify-center">
            <div>
                <img src={footerImg} alt="" className="w-60" />
               
                <p className="text-center mt-6">Copyright © 2023 - All right reserved By BloodBeacon</p>
                
            </div>
        </footer>
    </div>
  )
}

export default Footer