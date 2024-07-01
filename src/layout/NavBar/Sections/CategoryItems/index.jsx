import "./style.scss"
// import { categories } from "../../../../assets/images/categories"
import CategoryDetailModal from "../categoryDetails";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CategoryItems = ({ categoriesData }) => {
  //카테고리 부분을 모달 했으면 한번 더 요청을 하여 카테고리의 아이디(901)를 보내주어
  //서브 카테고리의 부분을 생성
  // 카테고리 부분을 클릭시 아이디(901)
  const [hoverItemId, setHoverItemId] = useState(null);
  const [isCategoryDetailModal, setIsCategoryDetailModal] = useState(true);
  const navigate = useNavigate()
  const handleMoveCategory = (categoryId) => {
     console.log(`Navigating to category: ${categoryId}`);
    navigate(`/goodslist/${categoryId}`);
  };
   const handleChildCategoryClick = (id) => {
     console.log(`Navigating to child category: ${id}`);
     navigate(`/goodslist/${id}`);
   };
   if (!categoriesData) {
     return null; // categoriesData가 없을 경우 컴포넌트를 렌더링하지 않음
   }
  return (
    <>
      <div className="CategoryItems">
        {categoriesData.map((categoryItem) => (
          <div
            key={categoryItem.id}
            className="categoryItem"
            onMouseEnter={() => {
              setHoverItemId(categoryItem.id), setIsCategoryDetailModal(true);
            }}
            onMouseLeave={() => setIsCategoryDetailModal(false)}
            onClick={() => handleMoveCategory(categoryItem.id)}
          >
            {/* <img
              src={categoryItem.imgUrl}
              alt={categoryItem.name}
              className="categoryItemImg"
            /> */}
            <p className="categoryItemName">{categoryItem.categoryName}</p>
          </div>
        ))}
        {categoriesData.map(
          (categoryItem) =>
            isCategoryDetailModal &&
            hoverItemId === categoryItem.id && (
              <div
                className="categoryDetailModal"
                key={categoryItem.id}
                onMouseEnter={() => {
                  setHoverItemId(categoryItem.id),
                    setIsCategoryDetailModal(true);
                }}
                onMouseLeave={() => setIsCategoryDetailModal(false)}
              >
                <CategoryDetailModal
                  categoryItemChildren={categoryItem.children}
                  onChildCategoryClick={handleChildCategoryClick}
                />
              </div>
            )
        )}
      </div>
    </>
  );
};

CategoryItems.propTypes = {
  categoriesData: PropTypes.array.isRequired,
};

export default CategoryItems