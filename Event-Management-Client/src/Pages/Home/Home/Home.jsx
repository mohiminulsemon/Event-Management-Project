
import AboutUs from './AboutUs';
import AllData from './AllData';
import ContactUs from './ContactUs';
import FeaturedEvents from './FeaturedEvents';
import Slider from './Slider';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <AllData></AllData>
            <FeaturedEvents></FeaturedEvents>
            <AboutUs></AboutUs>
            <Testimonials></Testimonials>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;