import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FcComments } from "react-icons/fc";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Review = () => {
    const [reviews, setReviews] = useState([]);

    console.log(reviews);
    useEffect(() => {
        fetch(`https://alternative-product-information-system-server.vercel.app/reviews`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })

    }, []);
    return (
        <div className=" container mx-auto my-10 ">
            <h1 className='text-center text-3xl font-bold my-10'>REVIEWS</h1>

            <Swiper

                modules={[Navigation, Pagination, Scrollbar, A11y]}

                slidesPerView={4}

                navigation
                pagination={{ clickable: true }}

                spaceBetween={10}

                breakpoints={{
                    425: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="my-swiper"

            >
                {reviews.map(review => (
                    <SwiperSlide key={review._id}>
                        <div className='text-white bg-[#0c241f] shadow-lg rounded-2xl h-[320px]  '>
                            <div className="flex gap-2 p-4">
                                <div className="border border-black w-12 h-12 rounded-full ">
                                    <img src={review.photo} className='rounded-full w-full h-full' />

                                </div>

                                <div>
                                    <p className='text-[16px] font-semibold'>{review.name}</p>
                                    <p className='text-sm'>{review.date} </p>
                                </div>
                            </div>
                            <div className=" p-3 flex gap-2">
                                <div >
                                    <span ><FcComments /></span>
                                </div>

                                <div className="text-sm">
                                    {review.comment}
                                </div>

                            </div>


                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>


        </div>
    );
};

export default Review;