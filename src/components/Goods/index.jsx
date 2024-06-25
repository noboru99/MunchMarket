import "./style.scss"
import propTypes from 'prop-types';
import { BsCart2 } from "react-icons/bs";
import { PiChatCenteredDots } from "react-icons/pi";
const Goods = ({ goodsItem, className }) => {
  const formatNumber = (cost) => {
    return cost.toLocaleString("ja-jp")
  }
  return (
    <div className={`goods ${className}`}>
      <img src={goodsItem.imgUrl} alt="상품 이미지" className="goodsImg" />
      <div className="addToCartBtnSection">
        <button className="addToCartBtn">
          <span>{<BsCart2 />}</span>
          <span>담기</span>
        </button>
      </div>
      <div className="goodsTitle">
        [{goodsItem.companyName}]{goodsItem.name}
      </div>
      <div className="originalPrice">
        {formatNumber(goodsItem.price)}
        <span>円</span>
      </div>
      <div className="discountSection">
        <p className="discountPercentage">{goodsItem.salePercent}%</p>
        <p className="discountedPrice">
          {formatNumber(
            goodsItem.price - (goodsItem.price * goodsItem.salePercent) / 100
          )}
          <span>円</span>
        </p>
      </div>
      <div className="chatCountSection">{<PiChatCenteredDots />}<span>+999</span></div>
    </div>
  );
};

Goods.propTypes = {
  goodsItem: propTypes.shape({
    id: propTypes.number.isRequired,
    companyName: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    salePercent: propTypes.number.isRequired,
    imgUrl: propTypes.string.isRequired,
  }).isRequired,
  className: propTypes.string.isRequired,
};
export default Goods