import reactLogo from "./../../assets/react.svg";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </header>
  );
}

export default Header;
