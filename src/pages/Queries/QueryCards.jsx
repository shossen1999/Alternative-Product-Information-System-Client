import React from 'react';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

const QueryCards = ({ query }) => {
    const { _id, product_name, product_brand, query_title, boycotting_reason, photo, email, name, currentDate, image, recommendationList, recommendationCount } = query;
    console.log(query);
    var date = new Date(currentDate);

    var readableDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2);

    // print(readableDate);
    console.log(name);
    return (
        <div className="card  bg-base-100 shadow-xl mx-10 md:mx-5 lg:mx-5 border border-gray-200">
            {/* <Helmet>
                <title></title>
            </Helmet> */}
            <div className='flex justify-start items-center gap-2 p-4'>
                <div>
                    <img src={photo} className='w-[40px] h-[40px] rounded-full' alt="" />
                </div>
                <div>
                    <h3>{name}</h3>
                    <h3>{readableDate}</h3>
                </div>
            </div>
            <figure className="px-10 pt-10">
                <img src={image} className="rounded-2xl w-full h-[180px]" />
            </figure>
            <div className="card-body">
                <h2 className="card-title ">
                    <span className="font-bold ">Product Name: </span>  {product_name}</h2>
                <p className="text-[14px]"><span className="font-bold ">Product Brand : </span> {product_brand}</p>
                <p className="text-[14px]">
                    <span className="font-bold ">Query Title : </span> {query_title}
                </p>
                <p className="text-[14px]"><span className="font-bold ">Boycotting Reason :</span> {boycotting_reason}</p>


                <p className="text-[14px]"><span className="font-bold ">Recommendation Count : </span>{recommendationCount}</p>
                <div className="card-actions w-full">
                    <Link to={`/queryDetails/${_id}`} className="w-full">
                        <input className="btn btn-block bg-black text-white mt-8 " type="submit" value="Recommend" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QueryCards;