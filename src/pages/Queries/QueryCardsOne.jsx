import React from 'react';
import { Link } from 'react-router-dom';

const QueryCardsOne = ({ query }) => {
    const { _id, product_name, product_brand, query_title, boycotting_reason, photo, name, currentDate, image, recommendationCount } = query;

    const date = new Date(currentDate);
    const readableDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2);

    return (
        <div className="card card-side bg-base-100 shadow-xl border border-gray-200 mx-10 md:mx-5 lg:mx-5">
            <figure className='w-1/2 h-auto'>
                <img src={image}  className="rounded-2xl w-full lg:w-[300px] md:w-[300px] h-[180px]" alt={product_name} />
            </figure>
            <div className='w-1/2 p-4'>
                <div className='flex items-center gap-2'>
                    <div>
                        <img src={photo} className='w-[40px] h-[40px] rounded-full' alt={name} />
                    </div>
                    <div>
                        <h3>{name}</h3>
                        <h3>{readableDate}</h3>
                    </div>
                </div>
                <h2 className="card-title mt-4">
                    <span className="font-bold">Product Name: </span>{product_name}
                </h2>
                <p className="text-[14px]"><span className="font-bold">Product Brand: </span>{product_brand}</p>
                <p className="text-[14px]"><span className="font-bold">Query Title: </span>{query_title}</p>
                <p className="text-[14px]"><span className="font-bold">Boycotting Reason: </span>{boycotting_reason}</p>
                <p className="text-[14px]"><span className="font-bold">Recommendation Count: </span>{recommendationCount}</p>
                <div className="card-actions justify-end w-full">
                    <Link to={`/queryDetails/${_id}`} className="w-full">
                        <input className="btn btn-block bg-black text-white mt-4" type="submit" value="Recommend" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QueryCardsOne;
