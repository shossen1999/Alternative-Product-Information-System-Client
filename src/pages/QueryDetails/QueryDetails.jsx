import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const QueryDetails = () => {
    const query = useLoaderData();
    const {user }=useAuth();
    // const touristsSpot = useLoaderData();
    const { _id, product_name, product_brand, query_title, boycotting_reason, photo, email, name, currentDate, image, recommendationList, recommendationCount } = query;
    const [recommendation, setRecommendation] = useState({
        recommendationTitle: '',
        recommendedProductName: '',
        recommendedProductImage: '',
        recommendationReason: ''
    });

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Fetch recommendations for the current query
        const fetchRecommendations = async () => {
            try {
                const response = await fetch(`http://localhost:5000/recommendations/${query._id}`);
                const data = await response.json();
                setRecommendations(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, [query._id]);
    var date = new Date(currentDate);

    var readableDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2);

    // print(readableDate);
    console.log(name);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecommendation(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddRecommendation = async (e) => {
        e.preventDefault();
        const newRecommendation = {
            ...recommendation,
            queryId: _id,
            queryTitle: query_title,
            productName: product_name,
            userEmail: email,
            userName: name,
            recommenderEmail: user?.email,
            recommenderName: user?.displayName,
            currentDate: new Date()
        };

        try {
            const response = await fetch('http://localhost:5000/addRecommendation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecommendation)
            });
            const data = await response.json();
            if (data.result.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Recommendation Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                setRecommendation({
                    recommendationTitle: '',
                    recommendedProductName: '',
                    recommendedProductImage: '',
                    recommendationReason: ''
                });

                  
            }
        } catch (error) {
            console.error("Error adding recommendation:", error);
        }
    };
    return (
        <div >
            <Helmet>
                <title>Spot Details</title>
            </Helmet>
            <div className="flex flex-col md:flex-row lg:flex-row gap-10 bg-gray-200">
            <div className="md:w-[40%] lg:w-[40%]">
                <img className="p-5 rounded-[20px] h-full" src={image} alt="" />
            </div>
            <div className="p-10 md:p-5 lg:p-5 flex flex-col space-y-2">
                <div className='flex justify-start items-center gap-2 p-4'>
                    <div>
                        <img src={photo} className='w-[40px] h-[40px] rounded-full' alt="" />
                    </div>
                    <div>
                        <h3>{name}</h3>
                        <h3>{readableDate}</h3>
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{product_name}</h2>



                <h2 className="card-title">
                    <span className="font-bold">Product Brand : </span> {product_brand}
                </h2>
                <p className="text-[18px] ">
                    <span className="font-bold text-[16px]">Query Title: </span>{query_title}
                </p>
                <p><span className="font-bold text-[16px]">Boycotting Reason: </span> {boycotting_reason}</p>
                <p className="text-[18px] ">
                    <span className="font-bold text-[16px]"> Recommendation Count: </span>{recommendationCount}
                </p>

                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-bold">Username: </p>
                    </div>
                    <p>{name}</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-bold">Useremail: </p>
                    </div>
                    <p>{email}</p>
                </div>


                <Link to="/"><button className="btn btn-primary">Go Back to Home</button></Link>

                 {/* Recommendation Form */}
                 
            </div>
            </div>
           <div>
           {recommendations.map((recommendation, index) => (
                <div key={index} className="recommendation-comment">
                    {/* Display recommendation information */}
                    <div className="card  bg-base-100 shadow-xl mx-10 md:mx-5 lg:mx-5 border border-gray-200">
            {/* <Helmet>
                <title></title>
            </Helmet> */}
            <div className='flex justify-start items-center gap-2 p-4'>
                {/* <div>
                    <img src={photo} className='w-[40px] h-[40px] rounded-full' alt="" />
                </div>
                <div>
                    <h3>{name}</h3>
                    <h3>{readableDate}</h3>
                </div> */}
            </div>
            <figure className="px-10 pt-10">
                <img src={recommendation.recommendedProductImage} className="rounded-2xl w-full h-[180px]" />
            </figure>
            <div className="card-body">
                <h2 className="card-title ">
                    <span className="font-bold ">Product Name: </span>  {recommendation. recommendationTitle}</h2>
                <p className="text-[14px]"><span className="font-bold ">Product Brand : </span> {recommendation.recommendedProductName}</p>
                <p className="text-[14px]">
                    <span className="font-bold ">Query Title : </span> {recommendation.recommendationReason}
                </p>
                
                {/* <div className="card-actions w-full">
                    <Link to={`/queryDetails/${_id}`} className="w-full">
                        <input className="btn btn-block bg-black text-white mt-8 " type="submit" value="Recommend" />
                    </Link>
                </div> */}
            </div>
        </div>
                    {/* Add other recommendation details as needed */}
                </div>
            ))}
           </div>
            <div>
            <form onSubmit={handleAddRecommendation} className="mt-5">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendationTitle">
                            Recommendation Title
                        </label>
                        <input
                            type="text"
                            name="recommendationTitle"
                            value={recommendation.recommendationTitle}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendedProductName">
                            Recommended Product Name
                        </label>
                        <input
                            type="text"
                            name="recommendedProductName"
                            value={recommendation.recommendedProductName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendedProductImage">
                            Recommended Product Image URL
                        </label>
                        <input
                            type="text"
                            name="recommendedProductImage"
                            value={recommendation.recommendedProductImage}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendationReason">
                            Recommendation Reason
                        </label>
                        <textarea
                            name="recommendationReason"
                            value={recommendation.recommendationReason}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Recommendation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QueryDetails;