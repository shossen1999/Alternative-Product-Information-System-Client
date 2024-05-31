import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyQueriesCards = ({ myQuery, queries, setQueries }) => {
    const { _id, product_name, product_brand, query_title, boycotting_reason, photo, email, name, currentDate, image, recommendationList, recommendationCount } = myQuery;
    console.log(myQuery);
    var date = new Date(currentDate);

    var readableDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2);

    console.log(name);

    const handleUpdate = (queryId) => {
        console.log("Update query with ID:", queryId);
    };

    const handleDelete = (_id) => {
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
                fetch(`http://localhost:5000/delete/${_id}`, {
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

                            // Update the state to remove the deleted query
                            const remaining = queries.filter(cart => cart._id !== _id);
                            setQueries(remaining);
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting item:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an error deleting the item.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className="card  bg-base-100 shadow-xl mx-10 md:mx-5 lg:mx-5 border border-gray-200">
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
                    <Link to={`/queryDetails/${_id}`} className="btn" style={{ backgroundColor: "#18555b", color: "white" }}>View Details</Link>
                    <Link to={`/updateQuery/${_id}`}>
                        <button
                            className="btn"
                            style={{ backgroundColor: "#18555b", color: "white" }}
                            onClick={() => handleUpdate(_id)}
                        >
                            Update
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn"
                        style={{ backgroundColor: "#18555b", color: "white" }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyQueriesCards;
