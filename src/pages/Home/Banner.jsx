
import { Link } from 'react-router-dom';

const Banner = () => {
    

    return (
        <div>
            <header>
             

                <div
                    className="w-full bg-center bg-cover h-[28rem]"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')`,
                    }}
                >
                    <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                        <div className="text-center">
                            <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                            Uncover Better Alternatives: Explore All Product Queries Now!
                            </h1>
                            <Link to="/allQueries">
                            <button className="w-[40%] md:w-auto  px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                All Queries
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Banner;
