// import axiosInstance from "../../../../utils/axios";
import { useState } from "react";
import { categories } from "../../../../assets/data/categories";
import PropTypes from "prop-types";
const CategoryId = ({ register, label, id }) => {
  // const getCategories = async() => {
  //     try {
  //   const response = await axios.get(``
  //   );
  //   const data = response.data;
  //   return data
  //     } catch (error) {
  //     console.error("エラーが発生しました", error);
  //   return error
  //     }
    // }
    const [selectedCategoryID, setSelectedCategoryID] = useState(null)
    const handleChange = (e) => {
        const selectedId = parseInt(e.target.value);
        setSelectedCategoryID(selectedId);
        console.log(selectedId);
    }
     const selectedCategory = categories.find(
       (category) => category.id === selectedCategoryID
     );
    console.log(selectedCategory);
  return (
    <div>
      <select id={id} label={label} {...register(id)} onChange={handleChange}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {selectedCategory &&
        selectedCategory.subCategories.map((subCategory) => (
          <div key={subCategory.id}>
            <label htmlFor={subCategory.id}>
              {subCategory.subCategoryName}
            </label>
            <input
              type="radio"
              key={subCategory.id}
              {...register("subCategoryId")}
            />
          </div>
        ))}
    </div>
  );
};

CategoryId.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
};
export default CategoryId