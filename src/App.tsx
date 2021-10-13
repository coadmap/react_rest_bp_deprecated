// eslint-disable-next-line no-use-before-define
import React, { FC } from "react";
import "antd/dist/antd.css";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import RecruitmentIndexPage from "./scenes/recruitment/RecruitmentIndexPage";
import SignInPage from "./scenes/signIn";

const App: FC = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={RecruitmentIndexPage} />
      <Route exact path="/sign_in" component={SignInPage} />
    </div>
  </BrowserRouter>
);

export default App;
