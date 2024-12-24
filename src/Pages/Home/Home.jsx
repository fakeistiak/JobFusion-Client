import CategoryList from "./CategoryList/CategoryList";
import FeaturedJobs from "./FeaturedJobs/FeaturedJobs";
import Hero from "./Hero/Hero";

const Home = () => {
    return (
        <div>
            <Hero/>
            <CategoryList/>
            <FeaturedJobs/>
        </div>
    );
};

export default Home;