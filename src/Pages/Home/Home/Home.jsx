import { Helmet} from 'react-helmet-async';
import Banner from '../Banner/Banner';
import ContactUs from './ContactUs/ContactUs';
import Feature from './Feature/Feature';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div>
        <Helmet>
            <title>BloodBeacon | Home</title>
        </Helmet>

        <Banner/>
        <Feature/>
        <ContactUs/>
        <Footer/>
    </div>
  )
}

export default Home