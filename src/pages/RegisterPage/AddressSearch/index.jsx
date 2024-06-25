import axios from "axios"
import { useState } from "react"
import PropTypes from "prop-types";
import "./style.scss"
const AddressSearch = ({
  openModal,
  setGetPostNumber,
  setOpenModal,
  setDeliveredAddress,
  setPostNumber,
}) => {
  const [zipCode, setZipCode] = useState();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!zipCode) {
      setError("郵便番号を入力してください。");
      return;
    }
    setError("");
    try {
      const response = await axios.get(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`
      );
      const data = response.data;
      if (data.results) {
        const result = data.results[0];
        setAddress(`${result.address1} ${result.address2} ${result.address3}`);
        setPostNumber(zipCode);
      } else {
        setAddress("住所が見つかりませんでした。");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
      setAddress("エラーが発生しました");
    }
  };

  const handleModal = () => {
    //모달창 닫기
    setOpenModal(false);
  };
  const handlePostNumber = () => {
    //주소데이터 보내기
    setDeliveredAddress(address);
    setGetPostNumber(true);
    //모달창 닫기
    setOpenModal(false);
  };
  if (!openModal) {
    return;
  }
  return (
    <div className="modalInner">
      <h2 className="modalTitle">郵便番号検索</h2>
      <div className="postNumInputSection">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="郵便番号を入力"
        />
        <button className="postNumSearchBtn" onClick={handleSearch}>
          検索
        </button>
        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </div>
      <div className="searchResult">
        <p>{address}</p>
      </div>
      {address && (
        <div className="confirmAddress">
          <button onClick={handlePostNumber}>確定する</button>
        </div>
      )}

      <div className="closeBtn">
        <button onClick={handleModal}>X</button>
      </div>
    </div>
  );
};
AddressSearch.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setGetPostNumber: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setDeliveredAddress: PropTypes.func.isRequired,
  setPostNumber: PropTypes.func.isRequired,
};
export default AddressSearch