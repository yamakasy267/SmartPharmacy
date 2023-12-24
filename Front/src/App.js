import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from "./components/http/UserAPI";
import {Footer, Header} from "./components/utils";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // check().then(data => {
        //     user.setUser(true)
        //     user.setIsAuth(true)
        // }).finally(() => setLoading(false))

        setLoading(false)
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <Header/>
            <main>
                <div className="background-snake__head d-none d-sm-block"></div>
                <AppRouter/>
            </main>
            <Footer/>
        </BrowserRouter>
    );
});

export default App;