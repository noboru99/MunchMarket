import PropTypes from "prop-types";


const CategoryDetailModal = ({
  categoryItemChildren,
  onChildCategoryClick,
}) => {
  
  return (
    <div>
      {categoryItemChildren.map((categoryChildren) => (
        <div
          key={categoryChildren.id}
          onClick={() => onChildCategoryClick(categoryChildren.id)}
        >
          <p>{categoryChildren.categoryName}</p>
        </div>
      ))}
    </div>
  );
};
CategoryDetailModal.propTypes = {
  categoryItemChildren: PropTypes.array.isRequired,
  onChildCategoryClick: PropTypes.func.isRequired,
};
export default CategoryDetailModal;
