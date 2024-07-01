import "./style.scss"
// import { subCategories } from "../../../../assets/data/subCategories";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
const SubCategoriesSection = ({ subCategories, mainCategoryID }) => {
  const { categoryId } = useParams();
  const [isSelected, setIsSelected] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (mainCategoryID == categoryId) {
    setIsSelected(mainCategoryID);
    } else {
      setIsSelected(parseInt(categoryId));
    } 
  }, [categoryId]);

  const handleSelect = (id) => {
    setIsSelected(id);
    navigate(`/goodslist/${id}`);
  };
  return (
    <ul className="subCategoryUl">
      <li
        key={mainCategoryID}
        onClick={() => handleSelect(mainCategoryID)}
        className={`subCategoryItem ${
          isSelected === mainCategoryID ? "selected" : ""
        }`}
      >
        전체보기
      </li>
      {subCategories.map((subCategoriesItem) => (
        <li
          key={subCategoriesItem.id}
          onClick={() => handleSelect(subCategoriesItem.id)}
          className={`subCategoryItem ${
            isSelected === subCategoriesItem.id ? "selected" : ""
          }`}
        >
          <a
            href="#"
            className="subCategoryItemName"
            onClick={(e) => e.preventDefault()}
          >
            {subCategoriesItem.categoryName}
          </a>
        </li>
      ))}
    </ul>
  );
};

SubCategoriesSection.propTypes = {
  subCategories: PropTypes.array.isRequired,
  mainCategoryID: PropTypes.number.isRequired
};
export default SubCategoriesSection;