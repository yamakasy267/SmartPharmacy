import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {NotFoundPage, Personal, ProductPage, SearchByAnalogue, SearchBySymptom, SearchTypeBar} from "./utils";
import {
    ANALOGUE_SEARCH_ROUTE, LOGIN_ROUTE,
    NAME_SEARCH_ROUTE,
    PERSONAL_ROUTE,
    PRODUCT_ROUTE, REGISTRATION_ROUTE,
    SYMPTOM_SEARCH_ROUTE
} from "./utils/Consts";
import {authRoutes, publicRoutes} from "../routes";
import Auth from "./pages/Auth";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    // console.log(user)

    return (
        <Routes>
            <Route path='*' element={<NotFoundPage/>}/>
            <Route path={LOGIN_ROUTE} element={<Auth/>}/>
            <Route path={REGISTRATION_ROUTE} element={<Auth/>}/>
            <Route path={PRODUCT_ROUTE} element={<ProductPage/>}/>
            <Route path="/" element={<SearchTypeBar/>}>
                <Route path={SYMPTOM_SEARCH_ROUTE} element={<SearchBySymptom/>}></Route>
                <Route path={ANALOGUE_SEARCH_ROUTE} element={<SearchByAnalogue/>}></Route>
                <Route path={NAME_SEARCH_ROUTE} element={<SearchByAnalogue/>}></Route>
            </Route>
            <Route path={PERSONAL_ROUTE} element={<Personal/>}/>
        </Routes>
        // <Routes>
        //     {/*{user.isAuth && authRoutes.map(({path, Component}) =>*/}
        //     {/*    <Route path={path} element={Component} exact/>*/}
        //     {/*)}*/}
        //     {publicRoutes.map(({ path, Component }) => (
        //         <Route path={path} element={<Component />} />
        //     ))}
        // </Routes>
    );
});

export default AppRouter;
