import { Routes, Route } from "react-router-dom";
import { ROUTE } from "../routes";

import * as Page from "../pages";
import AuthRoute from "./AuthRoute.routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<div>404</div>} />
      <Route path={ROUTE.login} element={<Page.Login />} />
      <Route path={ROUTE.logout} element={<Page.Logout />} />
      <Route path="/trainer" element={<AuthRoute />}>
        <Route path={ROUTE.home} element={<Page.Home />} />
        <Route path={ROUTE.arena} element={<div>arena</div>} />
        <Route path={ROUTE.user} element={<div>user</div>} />
      </Route>
    </Routes>
  );
};
