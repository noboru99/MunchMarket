import "./style.scss"
import { categories } from "../../../../assets/images/categories"
import CategoryDetailModal from "../categoryDetails";
import { useState } from "react";

const CategoryItems = () => {
  const [hoverItemId, setHoverItemId] = useState(null)
  const [isCategoryDetailModal, setIsCategoryDetailModal] = useState(true)
  return (
    <>
      <div className="CategoryItems">
        {categories.map((categoryItem) => (
          <div
            key={categoryItem.id}
            className="categoryItem"
            onMouseEnter={() => {
              setHoverItemId(categoryItem.id), setIsCategoryDetailModal(true);
            }}
            onMouseLeave={() => setIsCategoryDetailModal(false)}
          >
            <img
              src={categoryItem.imgUrl}
              alt={categoryItem.name}
              className="categoryItemImg"
            />
            <p className="categoryItemName">{categoryItem.name}</p>
            {isCategoryDetailModal && hoverItemId === categoryItem.id && (
              <div className="categoryDetailModal">
                <CategoryDetailModal />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryItems