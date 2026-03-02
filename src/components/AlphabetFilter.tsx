"use client";
import styles from "@/styles/alphabet.module.css"

export default function AlphabetFilter({ selected, onSelect }: { selected: string, onSelect: (letter: string) => void }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <nav className={styles.filter_container}>
      <button 
        onClick={() => onSelect("ALL")}
        className={`${styles.filter_btn} ${styles.alphabet_item} ${selected === "ALL" ? styles.active : ""}`}
      >
        ALL
      </button>

      {letters.map((char) => (
        <button
          key={char}
          onClick={() => onSelect(char)}
          className={`${styles.filter_btn} ${styles.alphabet_item} ${selected === char ? styles.active : ""}`}
        >
          {char}
        </button>
      ))}
    </nav>
  );
}