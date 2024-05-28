import React, { useEffect, useState } from 'react';


const RecentQueries = () => {
    const [queries, setQueries] = useState([]);
    

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recent-queries'); 
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Expected JSON but got " + contentType);
        }
        const data = await response.json();
        setQueries(data);
        
      } catch (error) {
        console.error('Error fetching recent queries:', error);
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
  //  const { _id, product_name, product_brand, query_title, boycotting_reason, photo, email, name, currentDate, image, recommendationList, recommendationCount } = myQuery;
 // console.log(myQuery);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {queries.map(query => (
        <div key={query._id} className="query-card">
          {/* <img src={query.image} alt={query.product_name} className="product-image" />
          <h3>{query.query_title}</h3>
          <p>Product Name: {query.product_name}</p>
          <p>Brand Name: {query.product_brand}</p>
          <p>Alternation Reason: {query.boycotting_reason}</p>
          <p>Date Posted: {query.currentDate}</p>
          <div className="user-info">
            <img src={query.photo} alt={query.name} className="user-thumbnail" />
            <p>{query.name}</p>
          </div> */}
                 <div className="card  bg-base-100 shadow-xl mx-10 md:mx-5 lg:mx-5 border border-gray-200">
            {/* <Helmet>
                <title></title>
            </Helmet> */}
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


                {/* <p className="text-[14px]"><span className="font-bold ">Recommendation Count : </span>{recommendationCount}</p> */}
                {/* <div className="card-actions w-full">
                    <Link to={`/spotDetails/${_id}`} className="btn btn-primary">View Details</Link>
                    <input className="btn btn-block bg-black text-white mt-8" type="submit" value="Recommend" />
                </div> */}
            </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default RecentQueries;
