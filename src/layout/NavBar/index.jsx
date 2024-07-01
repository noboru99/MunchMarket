import { useState } from "react";
import {
  logoImg,
  mapPinIcon,
  WishlistIcon,
  cartIcon,

} from "../../assets/images/imageUrls";
import "./styles/style.scss"
// import CategoryModal from "./Sections/categoryModal";
import CategoryItems from "./Sections/categoryItems";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUer } from "../../store/thunkFuctions";
import { getCategories } from "../../utils/getCategory";
//카테고리 부분 호버하면 카테고리 들이 나오도록하는 부분이니까 여기서 요청 보내야함
const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [categoriesData, setCategoriesData] = useState(null);
  const routes = [
    { to: "/login", name: "login", auth: false },
    { to: "/register", name: "register", auth: false },
    { to: "", name: "logout", auth: true },
  ];
  const isAuth = useSelector(state => state.user?.isAuth)
  const handleLogout = () => {
    dispatch(logoutUer())
    navigate("/")
  }

  const handleGetCategories = async () => {
    const response = await getCategories()
    
    setCategoriesData(response);
    
  }
  
  return (
    <>
      <div className="NavBarSection">
        <div className="NavBarContainer">
          <div className="NavAuthItems">
            {routes.map(({ to, name, auth }) => {
              if (isAuth !== auth) return null;
              if (name === "logout") {
                return (
                  <span key={name} className="registerBtn">
                    <Link className="linkBtn" onClick={handleLogout}>
                      {name}
                    </Link>
                  </span>
                );
              } else {
                return (
                  <span key={name} className="registerBtn">
                    <Link to={to}>{name} |</Link>
                  </span>
                );
              }
            })}
            <span>|</span>
            <span className="customerService">고객센터 ▼</span>
          </div>

          <div className="NavMain">
            <div className="NavHeader">
              <img src={logoImg} className="logoImg" />
              <div className="NavTitleMarketKurly">마켓컬리</div>

              <div className="NavTitleBeautyKurly">뷰티컬리</div>
            </div>

            <div className="NavSearch">
              <input
                type="text"
                className="SearchBox"
                placeholder="검색어를 입력해주세요"
              />
              <button className="magnifyingGlassIcon"></button>
            </div>

            <div className="NavIcons">
              <img src={mapPinIcon} alt="" />
              <img src={WishlistIcon} alt="" />
              <img src={cartIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="NavCategoryItems">
          <div
            className="categorySection"
            onMouseEnter={() => {
              setIsCategoryModal(true);
              handleGetCategories();
            }}
            onMouseLeave={() => setIsCategoryModal(false)}
          >
            <span className="categoryImg"></span>
            <span className="categoryText">카테고리</span>
          </div>
          <div className="categoryLinks">
            <p>신상품</p>
            <p>베스트</p>
            <p>알뜰쇼핑</p>
            <p>특가/혜택</p>
          </div>
          <div className="SpecialCategory">
            <span className="SpecialCategoryText">샛별·하루</span> 배송안내
          </div>
        </div>

        {isCategoryModal && categoriesData && (
          <div
            className="categoryModal"
            onMouseEnter={() => setIsCategoryModal(true)}
            onMouseLeave={() => setIsCategoryModal(false)}
          >
            <div
              className="categoryModalSection"
              onMouseEnter={() => setIsCategoryModal(true)}
              onMouseLeave={() => setIsCategoryModal(false)}
            >
              <CategoryItems categoriesData={categoriesData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default NavBar