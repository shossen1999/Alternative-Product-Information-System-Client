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
                fetch(`https://alternative-product-information-system-server.vercel.app/recommendation/delete/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deleteResult.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            const remaining = recommendations.filter(cart => cart._id !== _id);
                            setRecommendations(remaining);
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete the recommendation.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting item:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while deleting the recommendation.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const rowColors = ["#f8d7da", "#d4edda", "#d1ecf1", "#fcedd8", "#f4d7da"];
    return (
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
                                    <button className="border-none rounded-[8px] py-2 px-2 bg-red-600 text-black font-medium" onClick={() => handleDelete(recommendation._id)}>Delete</button>
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
