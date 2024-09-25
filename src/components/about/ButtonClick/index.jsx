
import React from 'react'
import styles from './style.module.css'


export const ButtonClick = ({children, ...props }) => {
    return (
        <button
            
            {...props}
            className={`${styles.gradientBorder}`}
        >
            {children}
        </button>
    );
};

