import React from 'react';
import './About.css';
import me from '../../assets/divanshu.jpg';
import { FaFacebookSquare, FaInstagramSquare,FaGoogle } from "react-icons/fa";

const about = () => {
    return (
        <div className='container About'>
            <div className='row'>
                <div className='col-md-5'>
                    <div className="about-img left">
                        <img className='image' src={me} alt="" />
                    </div>
                </div>
                <div className='col-md-7 about-right'>
                    <h2 className='color-3'>About ME</h2>
                    <p className='p-first'>Meet Divanshu, our head Chef! Making delicious pizzas since yesterday!</p>
                    <ul className='about-link links'>
                        <li><a href="https://www.facebook.com/divanshu.agarwal" target='_blank'><FaFacebookSquare size={28} /></a></li>
                        <li><a href="https://www.instagram.com/divanshuroxs/" target='_blank'><FaInstagramSquare size={28} /></a></li>
                        <li><a href="https://www.youtube.com/watch?v=GbUadD1yM_g" target='_blank'><FaGoogle size={28} /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default about;