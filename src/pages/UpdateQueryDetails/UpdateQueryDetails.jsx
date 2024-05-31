import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';

const UpdateQueryDetails = () => {

    const {user}=useAuth();
    const {id}=useParams();
    console.log(id);

    const [spot,setSpot]=useState({});

    useEffect(()=>{
        fetch(`https://alternative-product-information-system-server.vercel.app/singleQuery/${id}`)
        .then(res =>res.json())
        .then(data =>{
            setSpot(data)
            console.log(data);
        })
    },[id])

    const handleUpdateQuery = event =>{
        event.preventDefault();

        const form = event.target;
        const product_name = form.product_name.value;
        const product_brand = form.product_brand.value;
        const query_title = form.query_title.value;
        const boycotting_reason = form.boycotting_reason.value;
        const image = form.image.value;
        const name = user?.displayName;
        const email = user?.email;
        // console.log(userName);
        const photo = user?.photoURL;
        const currentDate = new Date();

        console.log('User Name:', name); // Line 21
        console.log('User Email:', email);

        const recommendationList = [];
        const recommendationCount = 0;

        const updatedQuery = {
            product_name, product_brand, query_title, boycotting_reason, photo, email, name, currentDate, image, recommendationList, recommendationCount
        }
        console.log(updatedQuery);

        fetch(`https://alternative-product-information-system-server.vercel.app/updatedQuery/${id}`,{
            method:'PUT',
            // ki dhoroner data send krbo tar jnno headers use krte hoy
            headers: {
                'content-type' : 'application/json'
            },

            body:JSON.stringify(updatedQuery)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: 'Success!',
                    text: 'Coffee Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  });
                  form.reset();
            }
        })


    }
    return (
        <div className="bg-[#F4F3F0] p-24">
            <Helmet>
                <title> Update Queries</title>
            </Helmet>
            <h2 className="text-3xl font-extrabold">Update Queries </h2>

            <form onSubmit={handleUpdateQuery} className="card-body">
                {/* form row1 */}
                <div className="md:flex gap-5  ">
                    <div className="form-control md:w-1/2 ">
                        <label className="label">
                            <span className="label-text ">Product Name</span>
                        </label>
                        <input type="text" defaultValue={spot.product_name}
                        name="product_name" placeholder="Product Name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control md:w-1/2 ">
                        <label className="label">
                            <span className="label-text">Product Brand</span>
                        </label>
                        <input type="text" name="product_brand"
                        defaultValue={spot.product_brand}
                        placeholder="Product Brand" className="input input-bordered w-full" required />
                    </div>
                </div>

                {/* form row2 */}
                <div className="md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Query TItle </span>
                        </label>
                        <input type="text"
                        defaultValue={spot.query_title}
                        name="query_title" placeholder="Query TItle" className="w-full input input-bordered" required />
                    </div>
                    <div className="form-control md:w-1/2 ">
                        <label className="label">
                            <span className="label-text">Boycotting Reason</span>
                        </label>
                        <input type="text" 
                        defaultValue={spot.boycotting_reason}
                        name="boycotting_reason" placeholder="Boycotting Reason" className="input input-bordered w-full" required />
                    </div>

                </div>




                {/* form row3 */}
                <div className="">
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text"
                        defaultValue={spot.image}
                        name="image" placeholder="Photo Image-URL" className="input input-bordered w-full" required />
                    </div>


                </div>

                <input className="btn btn-block bg-black text-white mt-8" type="submit" value="Update Query" />

            </form>
        </div>
    );
};

export default UpdateQueryDetails;