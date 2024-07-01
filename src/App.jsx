
import { Outlet, Route, Routes,  } from 'react-router-dom'
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage'
import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import MyPage from './pages/MyPage'
import InputPage from "./pages/InputPage"
// import { useEffect } from 'react'
// import {  useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import NotAuthRoutes from './components/NotAuthRoutes'
import GoodsListPage from './pages/GoodsListPage'
function Layout() {
  return <div>
    <NavBar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
}


function App() {
  // const dispatch = useDispatch()
  // const isAuth = useSelector(state => state.user?.isAuth)
  const isAuth = true;
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   if (isAuth) {
  //      dispatch(authUser())
  //   }
  // }, [isAuth, pathname, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route element={<ProtectedRoutes isAuth={isAuth} />}>
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route element={<NotAuthRoutes isAuth={isAuth} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/goodslist/:categoryId" element={<GoodsListPage />} />
          <Route path="/goodsinput" element={<InputPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
