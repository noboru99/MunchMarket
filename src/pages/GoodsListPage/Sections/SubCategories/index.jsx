import "./style.scss"
import { subCategories } from "../../../../assets/data/subCategories";
import { useState } from "react";
const SubCategoriesSection = () => {
  const [isSelected, setIsSelected] = useState(1)

  const handleSelect = (id) => {
    setIsSelected(id);
    console.log(id);
  }
  return (
    <ul  className="subCategoryUl">
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
            {subCategoriesItem.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SubCategoriesSection;