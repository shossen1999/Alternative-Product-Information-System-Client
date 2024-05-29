import React from 'react';
import { Link } from 'react-router-dom'; 

const QueryCardsTwo = ({ query }) => {
    const { _id, product_name, product_brand, query_title, boycotting_reason, photo, name, currentDate, image, recommendationCount } = query;
    
    const date = new Date(currentDate);
    const readableDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2);

    return (
        <div className="card bg-base-100 shadow-xl mx-10 md:mx-5 lg:mx-5 border border-gray-200 grid grid-cols-2">
            <figure>
                <img src={image} className="rounded-2xl w-full h-[180px]" alt={product_name} />
            </figure>
            <div className='flex flex-col justify-start items-start gap-2 p-4'>
                <h2 className="card-title">
                    <span className="font-bold">Product Name: </span>{product_name}
                </h2>
                <p className="text-[14px]"><span className="font-bold">Product Brand: </span>{product_brand}</p>
                <p className="text-[14px]"><span className="font-bold">Query Title: </span>{query_title}</p>
                <p className="text-[14px]"><span className="font-bold">Boycotting Reason: </span>{boycotting_reason}</p>
                <p className="text-[14px]"><span className="font-bold">Recommendation Count: </span>{recommendationCount}</p>
            </div>
            <div className="card-actions col-span-2">
                <Link to={`/queryDetails/${_id}`} className="w-full">
                    <input className="btn btn-block bg-black text-white mt-8" type="submit" value="Recommend" />
                </Link>
            </div>
        </div>
    );
};

export default QueryCardsTwo;
