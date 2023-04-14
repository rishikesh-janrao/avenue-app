import styles from "@/styles/Home.module.css";

export default function Loader({ className }) {
  return (
    <h2 className={`${styles.loader} ${className}`}>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </h2>
  );
}
