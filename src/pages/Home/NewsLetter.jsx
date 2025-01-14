import { useEffect } from "react";

const NewsLetter = () => {

  
    return (
        <div className="my-10 container mx-auto">
            <div className="w-[90%] md:h-[300px]  lg:w-2/3 mx-auto bg-green-200 md:w-[90%] h-[410px]  text-black rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center py-6 md:py-10  md:text-4xl">Subscribe to Alternative Product Information System</h1>
                <p className="text-xl px-20 font-medium">Stay Updated with Alternative Product Referrals.</p>
                <div className="md:flex px-20 gap-7 my-4">
                    <input type="text" className="px-3 py-2 md:w-[50%] bg-white mb-4 rounded-md" placeholder="Your Name"/>
                    <input type="email" className="md:w-[50%] bg-white py-2 px-3 mb-4 rounded-md" placeholder="Your Email Address" required />
                    <button className="bg-green-600 text-white py-2 px-8 rounded-md hover:bg-green-700 transition duration-300">SUBSCRIBE</button>
                </div>
                <p className="italic px-20">Only sustainable updates to support our planet.</p>
            </div>
        </div>
    );
};

export default NewsLetter;

