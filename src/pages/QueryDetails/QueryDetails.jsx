import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const QueryDetails = () => {
    const query = useLoaderData();
    const { user } = useAuth();
    const { _id, product_name, product_brand, query_title, boycotting_reason, photo, email, name, currentDate, image, recommendationCount: initialRecommendationCount } = query;

    const [recommendation, setRecommendation] = useState({
        recommendationTitle: '',
        recommendedProductName: '',
        recommendedProductImage: '',
        recommendationReason: ''
    });

    const [recommendations, setRecommendations] = useState([]);
    const [recommendationCount, setRecommendationCount] = useState(initialRecommendationCount);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch(`http://localhost:5000/recommendations/${query._id}`);
                const data = await response.json();
                setRecommendations(data);
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
            recommenderPhoto: user?.photoURL, // Include the photo URL
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
                setRecommendations(prevState => [...prevState, newRecommendation]);
                setRecommendationCount(prevCount => prevCount + 1);
            }
        } catch (error) {
            console.error("Error adding recommendation:", error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Query Details</title>
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
                        <span className="font-bold">Product Brand: </span> {product_brand}
                    </h2>
                    <p className="text-[18px]">
                        <span className="font-bold text-[16px]">Query Title: </span>{query_title}
                    </p>
                    <p><span className="font-bold text-[16px]">Boycotting Reason: </span> {boycotting_reason}</p>
                    <p className="text-[18px]">
                        <span className="font-bold text-[16px]">Recommendation Count: </span>{recommendationCount}
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
                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Recommendations</h3>
                {recommendations.map((recommendation, index) => (
                    <div key={index} className="recommendation-comment mb-4 flex md:flex-row lg:flex-row flex-col gap-4">
                        <figure className="mb-4">
                            <img src={recommendation.recommendedProductImage} className="rounded-2xl w-full lg:w-[300px] md:w-[300px] h-[180px]" alt="" />
                        </figure>
                        <div className="card bg-base-100 shadow-xl border border-gray-200 p-4 rounded-lg flex-1">
                            <div className='flex justify-start items-center gap-2 mb-4'>
                                <img src={recommendation.recommenderPhoto} className='w-[40px] h-[40px] rounded-full' alt="" />
                                <div>
                                    <h4 className="font-bold">{recommendation.recommenderName}</h4>
                                    <p>{new Date(recommendation.currentDate).toLocaleString()}</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    <span>Product Name: </span> {recommendation.recommendationTitle}
                                </h2>
                                <p className="text-[14px]"><span className="font-bold">Product Brand: </span> {recommendation.recommendedProductName}</p>
                                <p className="text-[14px]"><span className="font-bold">Recommendation Reason: </span> {recommendation.recommendationReason}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add Recommendation</h2>

                    <form onSubmit={handleAddRecommendation} className="mt-5">
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="recommendationTitle">
                                    Recommendation Title
                                </label>
                                <input
                                    type="text"
                                    name="recommendationTitle"
                                    value={recommendation.recommendationTitle}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    required
                                />
                            </div>

                            <div>
                                <label className="dark:text-white block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendedProductName">
                                    Recommended Product Name
                                </label>
                                <input
                                    type="text"
                                    name="recommendedProductName"
                                    value={recommendation.recommendedProductName}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    required
                                />
                            </div>

                            <div>
                                <label className="dark:text-white block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendedProductImage">
                                    Recommended Product Image URL
                                </label>
                                <input
                                    type="text"
                                    name="recommendedProductImage"
                                    value={recommendation.recommendedProductImage}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    required
                                />
                            </div>

                            <div>
                                <label className=" dark:text-white block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendationReason">
                                    Recommendation Reason
                                </label>
                                <textarea
                                    name="recommendationReason"
                                    value={recommendation.recommendationReason}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            >
                                Add Recommendation
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default QueryDetails;
