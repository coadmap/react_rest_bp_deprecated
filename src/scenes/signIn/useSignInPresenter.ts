import { useCurrentAccount } from "../../hooks/useCurrentAccount";
import { Account } from "../../data/Account";
import { HttpClient } from "../../utilities/axiosInstance";
import { APIHost } from "../../utilities/constants";
import PersistenceKeys from "../../utilities/persistKeys";
import { useHistory } from "react-router-dom";

export type SignInParams = {
  account: {
    email: string;
    password: string;
  };
};

export type SignInPayload = {
  account: Account;
  token: string;
};

export function useSignInPresenter() {
  const history = useHistory();
  const { setAccount } = useCurrentAccount();
  const signIn = async (data: SignInParams) => {
    try {
      const res = await HttpClient.request<SignInPayload>({
        method: "POST",
        url: `${APIHost.AUTH}/sign_in`,
        data,
      });
      localStorage.setItem(PersistenceKeys.GULLIVER_WORKS_AUTH_TOKEN, res.data.token);
      setAccount(res.data.account);
      history.push("/");
    } catch (e) {
      throw new Error(e);
    }
  };

  return { signIn };
}
