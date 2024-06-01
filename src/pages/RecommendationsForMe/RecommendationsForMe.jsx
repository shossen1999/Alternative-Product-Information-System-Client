import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './RecommendationsForMe.css'; 
const RecommendationsForMe = () => {
  const recommendations = useLoaderData();
  console.log("Frontend Recommendations: ", recommendations);

  // if (!recommendations) {
  //   return <div>Loading...</div>;
  // }
  const rowColors = ["#f8d7da", "#d4edda", "#d1ecf1", "#fcedd8", "#f4d7da"];
  return (
    <div>
    <h2>Recommendations for My Queries</h2>
    {recommendations.length > 0 ? (
      <div className="overflow-x-auto py-6 md:py-12 lg:py-12" style={{ backgroundColor: "#f0f0f0" }}>
        <table className="table table-xs" style={{ width: "100%", margin: 0 }}>
        <thead>
              <tr style={{ color: "black" }}>
                <th></th>
                <th className="header-recommendation-product-image">
                  <span>Recommendation Product Image</span>
                </th>
                <th className="header-recommendation-title">
                  <span>Recommendation Title</span>
                </th>
                <th className="header-recommendation-product-name">
                  <span>Recommendation Product Name</span>
                </th>
                <th className="header-recommendation-reason">
                  <span>Recommendation Reason</span>
                </th>
              </tr>
            </thead>
          <tbody>
            {recommendations.map((recommendation, index) => (
              <tr key={recommendation._id} style={{ color: "black", padding: "5px 0px", backgroundColor: rowColors[index % rowColors.length], height: "100px" }}>
                <td>{index + 1}</td>
                <td>
                  <img src={recommendation.recommendedProductImage} alt="Recommended Product" style={{ maxHeight: "60px", maxWidth: "60px", display: "block", margin: "0 auto" }} />
                </td>
                <td>{recommendation.recommendationTitle}</td>
                <td>{recommendation.recommendedProductName}</td>
                <td>{recommendation.recommendationReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>No recommendations found.</p>
    )}
  </div>
  );
};

export default RecommendationsForMe;


