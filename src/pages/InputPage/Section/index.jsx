import PropTypes from "prop-types";

const InputSection = ({ label, id, type, register }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id}  {...register} />
    </div>
  );
};

InputSection.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.object.isRequired,
};

// 기본값 설정
InputSection.defaultProps = {
  type: "text",
};
export default InputSection;
