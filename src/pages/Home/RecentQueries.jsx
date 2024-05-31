import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
//https://alternative-product-information-system-server.vercel.app
const RecentQueries = () => {
  const [queries, setQueries] = useState([]);


  useEffect(() => {
    const fetchQueries = async () => {
      try {
          const response = await axios.get('https://alternative-product-information-system-server.vercel.app/api/recentQueries');
          setQueries(response.data);
      } catch (error) {
          console.error('Error fetching queries:', error);
      }
  };

    fetchQueries();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };


  return (
    <div className="h-[600px] container mx-auto my-10 ">
      <h1 className='text-center text-3xl font-bold mb-4'>Recent Queries</h1>

      <Swiper

        modules={[Navigation, Pagination, Scrollbar, A11y]}

        slidesPerView={3}

        navigation
        pagination={{ clickable: true }}

        spaceBetween={30}
        breakpoints={{
          425: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="my-swiper"

      >
        {queries.map(query => (
          <SwiperSlide key={query._id} >

            <div className="card  bg-base-100 shadow-xl mx-10 md:mx-5 lg:mx-5 border border-gray-200">

              <div className='flex justify-start items-center gap-2 p-4'>
                <div>
                  <img src={query.photo} className='w-[40px] h-[40px] rounded-full' alt="" />
                </div>
                <div>
                  <h3>{query.name}</h3>
                  <h3>{formatDate(query.currentDate)}</h3>
                </div>
              </div>
              <figure className="px-10 pt-10">
                <img src={query.image} className="rounded-2xl w-full h-[180px]" />
              </figure>
              <div className="card-body">
                <h2 className="card-title ">
                  <span className="font-bold ">Product Name: </span>  {query.product_name}</h2>
                <p className="text-[14px]"><span className="font-bold ">Product Brand : </span> {query.product_brand}</p>
                <p className="text-[14px]">
                  <span className="font-bold ">Query Title : </span> {query.query_title}
                </p>
                <p className="text-[14px]"><span className="font-bold ">Boycotting Reason :</span> {query.boycotting_reason}</p>



              </div>
            </div>


          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  );
};

export default RecentQueries;


