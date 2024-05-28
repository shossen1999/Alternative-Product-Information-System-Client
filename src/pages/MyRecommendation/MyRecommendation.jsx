import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyRecommendation = () => {
    const myRecommendations = useLoaderData();
    const [recommendations, setRecommendations] = useState(myRecommendations);

    console.log(myRecommendations);
    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"

                });
                // console.log('delete confirmed');

                fetch(`http://localhost:5000/recommendation/delete/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"

                            });

                            const remaining = recommendations.filter(cart => cart._id !== _id);
                            setRecommendations(remaining);
                        }

                    })
                    .catch(error => {
                        console.error("Error deleting item:", error);
                    });
            }
        });
    }

    const rowColors = ["#f8d7da", "#d4edda", "#d1ecf1", "#fcedd8", "#f4d7da"];
    return (
        // <div>
        //     <h2>Hi recommendation</h2>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //         {
        //             // touristsSpots.map(touristsSpot =>
        //             //     <TouristsSpotCard
        //             //         key={touristsSpot._id}
        //             //         touristsSpot={touristsSpot}
        //             //     ></TouristsSpotCard>)

        //             recommendations.map((recommendation, index) => (
        //                     <div key={index} className="recommendation-comment">
        //                         {/* Display recommendation information */}
        //                         <div className="card  bg-base-100 shadow-xl mx-10 md:mx-5 lg:mx-5 border border-gray-200">
        //                 {/* <Helmet>
        //                     <title></title>
        //                 </Helmet> */}
        //                 <div className='flex justify-start items-center gap-2 p-4'>
        //                     {/* <div>
        //                         <img src={photo} className='w-[40px] h-[40px] rounded-full' alt="" />
        //                     </div>
        //                     <div>
        //                         <h3>{name}</h3>
        //                         <h3>{readableDate}</h3>
        //                     </div> */}
        //                 </div>
        //                 <figure className="px-10 pt-10">
        //                     <img src={recommendation.recommendedProductImage} className="rounded-2xl w-full h-[180px]" />
        //                 </figure>
        //                 <div className="card-body">
        //                     <h2 className="card-title ">
        //                         <span className="font-bold ">Product Name: </span>  {recommendation. recommendationTitle}</h2>
        //                     <p className="text-[14px]"><span className="font-bold ">Product Brand : </span> {recommendation.recommendedProductName}</p>
        //                     <p className="text-[14px]">
        //                         <span className="font-bold ">Query Title : </span> {recommendation.recommendationReason}
        //                     </p>

        //                     <button
        //                 onClick={() => handleDelete(recommendation._id)}
        //                 className="btn btn-primary">Delete</button>

        //                     {/* <div className="card-actions w-full">
        //                         <Link to={`/queryDetails/${_id}`} className="w-full">
        //                             <input className="btn btn-block bg-black text-white mt-8 " type="submit" value="Recommend" />
        //                         </Link>
        //                     </div> */}
        //                 </div>
        //                 </div>
        //                         {/* Add other recommendation details as needed */}
        //                     </div>
        //                 ))

        //         }


        //     </div>
        //     <div className="flex justify-center items-center my-5 md:my-8 lg:my-8">
        //         <Link to="/"><button className="btn btn-primary ">Go Back to Home</button></Link>
        //     </div>
        // </div>
        <div>
            <h2>My recommendations: {recommendations.length}</h2>
            <Helmet>
                <title>My recommendations</title>
            </Helmet>
            <div className="overflow-x-auto py-6 md:py-12 lg:py-12" style={{ backgroundColor: "#f0f0f0" }}>
                <table className="table table-xs " style={{ width: "100%", margin: 0 }}>
                    <thead>
                        <tr style={{ color: "black" }}>
                            <th></th>
                            <th>Recommendation Product Image</th>
                            <th>Recommendation Title </th>
                            <th>Recommendation Product Name</th>
                            <th>Recommendation Reason</th>


                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recommendations.map((recommendation, index) => (
                            <tr key={recommendation._id} style={{ color: "black", padding: "5px 0px", backgroundColor: rowColors[index % rowColors.length] }}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={recommendation.recommendedProductImage} alt="Recommended Product" style={{ maxWidth: "40px", height: "auto", display: "inline", margin: "0 auto" }} />
                                </td>
                                <td>{recommendation.recommendationTitle}</td>
                                <td>{recommendation.recommendedProductName}</td>
                                <td>{recommendation.recommendationReason}</td>


                                <td>
                                    <button className="border-none  rounded-[8px] py-2 px-2 bg-red-600 text-black font-medium" onClick={() => handleDelete(recommendation._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyRecommendation;

