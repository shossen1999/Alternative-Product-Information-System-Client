import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();

    // navigation systems
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location?.state || "/";

    const handleSocialLogin = socialProvider => {
        socialProvider().then((result) => {
            if (result.user) {
                navigate(from);
            }
        });
    }

    return (
        < >
            <div className="divider">
                Continue With
            </div>
            <div className="flex justify-around">
                <button
                    onClick={() => handleSocialLogin(googleLogin)}
                    className="btn btn-primary btn-sm btn-outline">Google</button>
                <button
                    onClick={() => handleSocialLogin(githubLogin)}
                    className="btn btn-primary btn-sm btn-outline">Github</button>
            </div>

        </>
    );
};

export default SocialLogin;