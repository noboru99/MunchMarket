import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../../../utils/axios";

const PackingTypeId = ({ label, id, register }) => {
    const [getPackingId, setGetPackingId] = useState(null)
    useEffect(() => {
      handleGetPackingTypeId()
    }, [])
    const handleGetPackingTypeId = async () => { 
        try {
      const response = await axiosInstance.get(`/admin/product/packaging-types`);
      console.log("response", response.data.data)
      setGetPackingId(response.data.data)
    } catch (error) {
      console.log("statusCode", error.response.status);
      console.log("messageCode", error.response.data.message);
    }
    }
    return <div>
        {getPackingId &&
        <select id={id} label={label} {...register}>
                {getPackingId.map((getPacking) => (
                <option key={getPacking.id} value={getPacking.id}>
                        {getPacking.packagingTypeName}
                        {getPacking.packagingTypeDescription}
                </option>
            ))}
        </select>
        }
  </div>;
};

PackingTypeId.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
};
export default PackingTypeId;