"use client";
import React from 'react'
import styles from './style.module.css'
// import Link from 'next/link';
import { ButtonClick } from '../ButtonClient';

export const Button = ({ href, children, ...props }) => {
    if (!href) return <ButtonClick  {...props}  >
        {children}
    </ButtonClick>
    return (
        // <Link  
        //     href={`${href}`}
        //     className={`${styles.gradientBorder}`}
        // >
        //     <span>{children}</span>
        // </Link>

        <a
            href={`${href}`}
            className={`${styles.gradientBorder}`}
        >
            <span>{children}</span>
        </a>
    );
};

