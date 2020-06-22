import React from 'react';
import classes from './About.module.css';
import me from '../../assets/divanshu.jpg';

const about = () => {
    return (
        <div className={classes.About}>
            <img src={me} alt=" " />
        </div>
    );
};

export default about;