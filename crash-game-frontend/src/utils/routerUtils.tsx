import { Route, Routes } from "react-router-dom";
import { IRouterType } from "./typeUtils";
import { Suspense } from "react";
import { PAGE_DATA } from "./dataUtils";
import LoadingPage from "@pages/loading";

const renderRoutes = (routes: IRouterType[]) => {
  return routes.map(({ title, path, element, children = [] }: IRouterType) => {
    return (
      <Route key={title} path={path} element={element}>
        {children.length > 0 && <Route>{renderRoutes(children)}</Route>}
      </Route>
    );
  });
};

export const PageRouter = () => {
  const PAGE_ROUTER = renderRoutes(PAGE_DATA);
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>{PAGE_ROUTER}</Routes>
    </Suspense>
  );
};
