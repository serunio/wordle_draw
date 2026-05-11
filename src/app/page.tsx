"use client"
import styles from "./page.module.css";
import {Grid} from "@/components/Grid";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Grid/>
      </main>
    </div>
  );
}
