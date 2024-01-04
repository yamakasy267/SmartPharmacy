import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    PERSONAL_ROUTE,
    PRODUCT_ROUTE,
    REGISTRATION_ROUTE,
    UPDATE_USER_INFO_ROUTE
} from "./components/utils/Consts";

import {
    AdminPage,
    AuthPage,
    NotFoundPage,
    PersonalPage,
    ProductPage,
    UpdateUserInfoPage
} from "./components/utils";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
]

export const userRoutes = [
    {
        path: PERSONAL_ROUTE,
        Component: PersonalPage
    },
    {
        path: UPDATE_USER_INFO_ROUTE,
        Component: UpdateUserInfoPage
    },

]

export const publicRoutes = [
    {
        path: '*',
        Component: NotFoundPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
]
