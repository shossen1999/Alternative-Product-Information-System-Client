import Banner from "./Banner";
import RecentQueries from "./RecentQueries";

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
        </div>
    );
};

export default Home;