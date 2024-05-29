import logo from "../../assets/main_logo.png";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer bg-[#18555b] text-white p-10 ">
            <aside>
                <img src={logo} className="" alt="Logo" />
                <p>Providing reliable Tech service since 1992</p>
                <p>E-mail: lapguru@gmail.com</p>
                <p>Contact: +880 1609197055</p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4 text-white">
                    <a href="https://www.linkedin.com"><FaLinkedin className='w-6 h-6' /></a>
                    <a href="https://www.facebook.com"><FaFacebook className='w-6 h-6' /></a>
                    <a href="https://www.twitter.com"><FaTwitter className='w-6 h-6' /></a>
                    <a href="https://www.youtube.com">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                </div>
                <div>
                    <p>Copyright © 2024 - All rights reserved by LapGuru</p>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
