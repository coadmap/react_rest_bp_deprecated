import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./style.module.scss";
import { Button } from "antd";
import PersistenceKeys from "../../../utilities/persistKeys";

const RecruitmentIndexPage = () => {
  const history = useHistory();
  const onClickSignOut = () => {
    localStorage.setItem(PersistenceKeys.GULLIVER_WORKS_AUTH_TOKEN, "");
    history.push("/sign_in");
  };
  return (
    <div className={styles.text}>
      全ての募集
      <Link to="/sign_in">ログイン</Link>
      <button onClick={onClickSignOut}>ログアウト</button>
    </div>
  );
};

export default RecruitmentIndexPage;
