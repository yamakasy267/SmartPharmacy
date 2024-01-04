import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'
import {Context} from "../index";
import {observer} from "mobx-react-lite";

import {
  SearchByAnalogue,
  SearchByName,
  SearchBySymptom,
  SearchTypeBar,
} from "./utils";

import {
  ANALOGUE_SEARCH_ROUTE,
  NAME_SEARCH_ROUTE, SEARCH_BAR_ROUTE,
  SYMPTOM_SEARCH_ROUTE
} from "./utils/Consts";

import {adminRoutes, publicRoutes, userRoutes} from "../routes";

const AppRouter = observer(() => {
  const {user} = useContext(Context)
  return (
    <Routes>
      <Route path={SEARCH_BAR_ROUTE} element={<SearchTypeBar/>}>
        <Route path={SYMPTOM_SEARCH_ROUTE} element={<SearchBySymptom/>}></Route>
        <Route path={ANALOGUE_SEARCH_ROUTE} element={<SearchByAnalogue/>}></Route>
        <Route path={NAME_SEARCH_ROUTE} element={<SearchByName/>}></Route>
      </Route>
      {publicRoutes.map(({path, Component}, index) => (
        <Route key={index} path={path} element={<Component/>}/>
      ))}
      {user.isAuth && userRoutes.map(({path, Component}, index) => (
        <Route key={index} path={path} element={<Component/>}/>
      ))}
      {user.isAdmin && adminRoutes.map(({path, Component}, index) => (
        <Route key={index} path={path} element={<Component/>}/>
      ))}
    </Routes>
  );
});

export default AppRouter;
