import styles from "../scss/ValidateSnackBar.module.scss";

interface ValidateSnackbarProps {
  closeSnackBar(): void;
}

export const ValidateSnackBar = (props: ValidateSnackbarProps) => {
  const handleClick = () => {
    props.closeSnackBar();
  };

  return (
    <>
      <div className={styles.snackBarContainer}>
        <div className={styles.textButtonContainer}>
          <p>Fyll i formuläret korrekt</p>
          <button onClick={handleClick}>
            <div>X</div>
          </button>
        </div>
      </div>
    </>
  );
};
