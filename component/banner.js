import styles from "../styles/banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}> Jayvee</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shop!</p>

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
