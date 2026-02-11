"use client";
import styles from "@/styles/alphabet.module.css"

export default function AlphabetFilter({ selected, onSelect }: { selected: string, onSelect: (letter: string) => void }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <nav className={styles.filter_container}>
      <button 
        onClick={() => onSelect("ALL")}
        className={`filter-btn ${selected === "ALL" ? "active" : ""}`}
      >
        ALL
      </button>
      {letters.map((char) => (
        <button
          key={char}
          onClick={() => onSelect(char)}
          className={`filter-btn ${selected === char ? "active" : ""}`}
        >
          {char}
        </button>
      ))}
    </nav>
  );
}