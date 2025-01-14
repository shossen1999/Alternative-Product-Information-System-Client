import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Login = () => {
    const { signInUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location?.state || "/";
    const onSubmit = async (data) => {
        const { email, password } = data;
       
        try {
            await signInUser(email, password)
                .then((result) => {
                    
                    const loggedInUser = result.user;
                    console.log(loggedInUser);
                    const user = { email };
                    
                    axios.post('https://alternative-product-information-system-server.vercel.app/jwt', user,{withCredentials:true})
                      .then(res => {
                        console.log(res.data);
                        if(res.data.success){
                            navigate(from);
                        }
                      })
                });

        } catch (error) {
            console.error("Login failed:", error.message);
            
            toast.error("Invalid email or password");
        }
    };

    return (
        <div>

            <div>
                <ToastContainer />
                <h3 className="text-3xl text-center">Please Login</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            name="email" placeholder="Email"
                            className="input input-bordered" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-700">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            name="password" placeholder="Password"
                            className="input input-bordered" {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-700">This field is required</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <div>
                        <SocialLogin></SocialLogin>
                    </div>
                </form>

                <p className="text-center mt-4">Don't have an account? Please <Link className="text-blue-700 font-bold" to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;