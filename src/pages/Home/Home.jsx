import Banner from "./Banner";
import NewsLetter from "./NewsLetter";
import RecentQueries from "./RecentQueries";
import Review from "./Review";

import SwipperSlider from "./SwipperSlider";


const Home = () => {
    return (
        <div>
            <div>
                <SwipperSlider></SwipperSlider>
            </div>
            <div className="mt-10">
                <Banner></Banner>
            </div>
            <div className="mt-10">
                <RecentQueries></RecentQueries>
            </div>
            <div className="mt-10">
                <NewsLetter></NewsLetter>
            </div>
            <div className="mt-10">
               <Review></Review>
            </div>
        </div>
    );
};

export default Home;