import React from "react";
import styles from "./style.module.css";
import { about, questions, WeeklyPortion } from "./text.js";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate()
  const RenderList = ({ items, title, href }) => (
    <div className={styles.renderList}>
      <h3 className={styles.title} onClick={href? ()=>navigate(`/${href}`) : ()=>{}}>{title}</h3>
      <ul>
        {items?.map((item, index) => (
          <li key={index}>
            <span className={styles.link} onClick={()=>navigate(`/${item.href}`)}>
            {/* <span className={styles.link} onClick={()=>navigate(`/${title}/${item.href}`)}> */}
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className={styles.Footer}>
      <nav className={styles.container}>
        <div className={styles.containerList}>
          <RenderList items={WeeklyPortion} title={"נושאים"} />
          <RenderList items={about} title={"אודות"} href={"about"}/>
          <RenderList items={questions} title={"שאלות"} />
        </div>
      </nav>
      <p className={styles.rightsToUs}>
         תשפ&quot;ד © 2024
        <br />
        עיצוב ופיתוח : אהרן כהן ואפרים לב
      </p>
    </footer>
  );
}
