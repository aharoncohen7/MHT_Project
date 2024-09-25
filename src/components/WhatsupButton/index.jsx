import React from "react";
// import Link from "next/link";
import styles from "./style.module.css";
import { FaWhatsapp } from "react-icons/fa";

export default function JoinUs() {
  return (
    <a href={"/JoinUs"} className={styles.container}>
      <FaWhatsapp className={styles.logo} />
      פנה אלינו דרך הוואצאפ
    </a>
  );
}
