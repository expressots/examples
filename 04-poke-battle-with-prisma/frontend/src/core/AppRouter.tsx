import { Routes, Route } from "react-router-dom";
import { ROUTE } from "../routes";

import * as Page from "../pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<div>404</div>} />
      <Route path={ROUTE.home} element={<div>home</div>} />
      <Route path={ROUTE.arena} element={<div>arena</div>} />
      <Route path={ROUTE.login} element={<Page.Login />} />
      <Route path={ROUTE.user} element={<div>user</div>} />
    </Routes>
  );
};
