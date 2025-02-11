import CategoryList from "./CategoryList/CategoryList";
import ContactUs from "./ContactUs/ContactUs";
import FeaturedJobs from "./FeaturedJobs/FeaturedJobs";
import Hero from "./Hero/Hero";

const Home = () => {
    return (
        <div>
            <Hero/>
            <CategoryList/>
            <FeaturedJobs/>
            <ContactUs/>
        </div>
    );
};

export default Home;