import { useCurrentAccount } from "../../hooks/useCurrentAccount";
import { Account } from "../../data/Account";
import { HttpClient } from "../../utilities/axiosInstance";
import {APIHost} from "../../utilities/constants";

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
  const { setAccount } = useCurrentAccount();
  const signIn = async (data: SignInParams) => {
    try {
      const res = await HttpClient.request<SignInPayload>({
        method: "POST",
        url: `http://localhost:8000/sign_in`,
        data,
      });
      localStorage.setItem("GULLIVER_WORKS_AUTH_TOKEN", res.data.token);
      setAccount(res.data.account);
    } catch (e) {
      console.error(e);
    }
  };

  return { signIn };
}
