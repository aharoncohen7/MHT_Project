import React from "react";
import styles from "./style.module.css";
import { about, questions, WeeklyPortion } from "./text.js";
export default function Footer() {
  const RenderList = ({ items, title }) => (
    <div className={styles.renderList}>
      <h3 className={styles.title}>{title}</h3>
      <ul>
        {items?.map((item, index) => (
          <li key={index}>
            <a className={styles.link} href={`/${item}/${title}`}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className={styles.Footer}>
      <nav className={styles.container}>
        <div className={styles.containerList}>
          <RenderList items={about} title={"אודות"} />
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
