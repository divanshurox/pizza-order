import React from 'react';
import classes from './LowPart.module.css';
import playStore from '../../../assets/googleplay.png';
import appStore from '../../../assets/apple.png';

const lowPart = (props) => {
    return (
        <div className={classes.all}>
            <div className={classes.LowPart}>
                <div className={classes.sub}>
                    <h3>Order Now</h3>
                    <ul>
                        <li>Deals</li>
                        <li>Pizza</li>
                        <li>Sides</li>
                    </ul>
                </div>
                <div className={classes.sub}>
                    <h3>About</h3>
                    <ul>
                        <li>ContactLess Delivery</li>
                        <li>About Us</li>
                        <li>Nutrition</li>
                    </ul>
                </div>
                <div className={classes.sub}>
                    <h3>Our Policies</h3>
                    <ul>
                        <li>Terms and Conditions</li>
                        <li>Disclosures</li>
                        <li>FAQs and Help</li>
                    </ul>
                </div>
                <div className={classes.sub}>
                    <h3>Visit Pizz-o-Mania</h3>
                    <ul>
                        <li>Store Locator</li>
                        <li>Create a Blog</li>
                        <li>Help us Improve</li>
                    </ul>
                </div>
            </div>
            <img src={playStore} alt='google' />
            <div className={classes.end}>
                <p>Order a delicious pizza on the go, anywhere, anytime. Pizza Hut is happy to assist you with your home delivery. Every time you order, you get a hot and fresh pizza delivered at your doorstep in less than thirty minutes. *T&C Apply.
                </p>
                <br />
                <p>Hurry up and place your order now!</p>
                <br />
                <p>© 2020 Pizz-o-Mania India. All rights reserved. License Number: 10017011004220</p>
            </div>
        </div>
    );
};

export default lowPart;