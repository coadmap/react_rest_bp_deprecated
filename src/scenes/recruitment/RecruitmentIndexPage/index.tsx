import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const RecruitmentIndexPage = () => (
  <div className={styles.text}>
    全ての募集
    <Link to="/sign_in">ログイン</Link>
  </div>
);

export default RecruitmentIndexPage;
