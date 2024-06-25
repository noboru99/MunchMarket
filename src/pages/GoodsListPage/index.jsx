import "./style.scss"
import CategoriesTitleImage from "./Sections/categoriesTitleImage";
import SubCategoriesSection from "./Sections/SubCategories";
import FilterSection from "./Sections/FilterSection";
import GoodsListSection from "./Sections/GoodsListSection";

const GoodsListPage = () => {
    return (
      <div className="goodsListInner">
        <div className="categoriesTitleImageSection">
          <CategoriesTitleImage />
        </div>
        <div className="categoriesTitleSection">
          <p>과일·견과·쌀</p>
        </div>
        <div className="subCategoriesSection">
          <SubCategoriesSection />
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