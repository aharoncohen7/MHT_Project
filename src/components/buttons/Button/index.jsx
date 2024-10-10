import React from 'react'
import styles from './style.module.css'
import { ButtonClick } from '../ButtonClick';
// import Link from 'next/link';

export const Button = ({ href, children, ...props }) => {
    if (!href) return <ButtonClick  {...props}  >
        {children}
    </ButtonClick>
  
  return (
        <a
            href={`${href}`}
            className={`${styles.gradientBorder}`}
        >
            <span>{children}</span>
        </a>
    );
};

