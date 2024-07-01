import "./style.scss"
import CategoriesTitleImage from "./Sections/categoriesTitleImage";
import SubCategoriesSection from "./Sections/SubCategories";
import FilterSection from "./Sections/FilterSection";
import GoodsListSection from "./Sections/GoodsListSection";
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosInstance from "../../utils/axios";
//메인화면에서 카테고리 부분을 눌렀을 경우 903을 요청
// 그후 전체보기는 903인데 옆 903001을 누르면 한번 더 요총하는걸로 
const GoodsListPage = () => {
  const { categoryId } = useParams();
  const [getCategory, setGetCategory] = useState(null)
  
  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const response = await axiosInstance.get(`categories/${categoryId}`)
        console.log("response", response.data)
        setGetCategory(response.data)
      } catch (error) {
        console.log("statusCode", error.response.status);
        console.log("messageCode", error.response.data.message);
        return false;
      }
    }
    getCategoryList();
  }, [categoryId]);

  console.log("getCategory", getCategory)
  if (!getCategory) return <div>Loading...</div>
  return (
    <div className="goodsListInner">
      <div className="categoriesTitleImageSection">
        <CategoriesTitleImage />
      </div>
      <div className="categoriesTitleSection">
        <p>{getCategory.categoryName}</p>
      </div>
      <div className="subCategoriesSection">
        <SubCategoriesSection subCategories={getCategory.children}
          mainCategoryID={getCategory.id } />
      </div>
      <div className="filterAndGoodsSection">
        <div className="filterSection">
          <FilterSection />
        </div>
        <div className="goodsListSection">
          <GoodsListSection />
        </div>
      </div>
    </div>
  );
}

export default GoodsListPage;