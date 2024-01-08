import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Footer, Header} from "./components/utils";
import {scrap} from "./components/api/ProductAPI";
import Loading from "./components/LoadingModule";

const App = observer(() => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // check().then(data => {
    //     user.setUser(true)
    //     user.setAuth(true)
    // }).finally(() => setLoading(false))

    // let data = scrap()
    // console.log(data)

    setLoading(false)
  }, [])

  if (loading) { return <Loading/> }

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