import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useCurrentAccount } from "../../hooks/useCurrentAccount";
import styles from "./style.module.scss";
import {SignInParams, SignInPayload, useSignInPresenter} from "./useSignInPresenter";
import {HttpClient} from "../../utilities/axiosInstance";
import {APIHost} from "../../utilities/constants";

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInParams>();
  const { signIn } = useSignInPresenter();
  const { account } = useCurrentAccount();
  const history = useHistory();

  useEffect(() => {
    if (account) history.push("/");
  }, [account]);

  const onSubmit = (data: SignInParams) => {
    signIn(data);
  };
  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="account.email" ref={register} />
        <input name="account.password" ref={register} />
        <button>ログイン</button>
        <Link to="/">ホームへ</Link>
      </form>
    </div>
  );
};

export default SignInPage;
