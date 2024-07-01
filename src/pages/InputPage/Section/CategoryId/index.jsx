import "./style.scss"
import axiosInstance from "../../../../utils/axios";
import { useEffect, useState } from "react";
// import { categories } from "../../../../assets/data/categories";
import PropTypes from "prop-types";
const CategoryId = ({ register, label, id }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(null);
    // console.log("categories", categories);
  const handleGetCategories = async() => {
    try {
      const response = await axiosInstance.get(`/categories`);
      console.log("response", response.data.data)
      setCategories(response.data.data)
    } catch (error) {
      console.log("statusCode", error.response.status);
      console.log("messageCode", error.response.data.message);
    }
  }
      useEffect(() => {
        handleGetCategories();
      }, []);
    const handleChange = (e) => {
      const selectedId = parseInt(e.target.value);
      setSelectedCategoryID(selectedId);
      console.log("selectedId", selectedId);
      
    }
     const selectedCategory = categories.find(
       (category) => category.id === selectedCategoryID
     );
  const handleSubCategory = (e) => {
    console.log("subCategory", e.target);
  }
    // console.log("selectedCategory", selectedCategory);
  return (
    <div className="inputSection-categoryID">
      <select id={id} label={label} onChange={handleChange}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <div className="input-categoryId-radioBox">
        {selectedCategory &&
          selectedCategory.children.map((subCategory) => (
            <div key={subCategory.id}>
              <label htmlFor={subCategory.id}>{subCategory.categoryName}</label>
              <input
                type="radio"
                key={subCategory.id}
                value={subCategory.id}
                {...register}
                onClick={handleSubCategory}
                className="radioBtn"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

CategoryId.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
};
export default CategoryId