import {
    ANALOGUE_SEARCH_ROUTE, LOGIN_ROUTE,
    NAME_SEARCH_ROUTE,
    PERSONAL_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SEARCH_BAR_ROUTE,
    SYMPTOM_SEARCH_ROUTE
} from "./components/utils/Consts";

import Auth from "./components/pages/Auth";
import {Personal, ProductPage, SearchByAnalogue, SearchBySymptom, SearchTypeBar} from "./components/utils";

export const authRoutes = [
    // {
    //     path: ADMIN_ROUTE,
    //     Component: Admin
    // },
    {
        path: PERSONAL_ROUTE,
        Component: Personal
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SEARCH_BAR_ROUTE,
        Component: SearchTypeBar
    },
    {
        path: SYMPTOM_SEARCH_ROUTE,
        Component: SearchBySymptom
    },
    {
        path: ANALOGUE_SEARCH_ROUTE,
        Component: SearchByAnalogue
    },
    {
        path: NAME_SEARCH_ROUTE,
        Component: SearchByAnalogue
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
]
