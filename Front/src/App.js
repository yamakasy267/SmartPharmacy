import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Footer, Header} from "./components/utils";
import {fetchFavorites} from "./components/api/ProductAPI";
import Loading from "./components/LoadingModule";
import {Context} from "./index";
import {fetchUserInfo} from "./components/api/UserAPI";

const App = observer(() => {
  const {user} = useContext(Context);
  const {favoriteProducts} = useContext(Context);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkTokenValid() {
      let userData = await fetchUserInfo().catch(() => {});
      if (userData) {
        user.setUser(userData["user"]);
        user.setAuth(true);

        fetchFavorites().then(data => {
          favoriteProducts.setProducts(data["views"]);
        })
      }
      setLoading(false)
    }

    checkTokenValid().then(r => {})
  }, [])


  if (loading) {
    return <Loading/>
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