import styles from "../scss/Loader.module.scss";
export const Loader = () => {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <i className={`${styles.spinner} fa fa-spinner`}></i>
      </div>
    </>
  );
};
