import React from "react";
import styles from "./style.module.css";
import { about, questions, WeeklyPortion } from "./text.js";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate()
  const RenderList = ({ items, title }) => (
    <div className={styles.renderList}>
      <h3 className={styles.title}>{title}</h3>
      <ul>
        {items?.map((item, index) => (
          <li key={index}>
            <span className={styles.link} onClick={()=>navigate(`/${title}/${item}`)}>
              {item}
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
          <RenderList items={about} title={"about"} />
          <RenderList items={questions} title={"שאלות"} />
          <RenderList items={WeeklyPortion} title={"פרשת השבוע"} />
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