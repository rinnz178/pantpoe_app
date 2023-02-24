import React from "react";
import { Route } from "react-router-dom";

function RouteWithSubRoutes(route) {
  console.log(route);
  return <Route path={route.path} component={route.component} />;
}

export default RouteWithSubRoutes;
