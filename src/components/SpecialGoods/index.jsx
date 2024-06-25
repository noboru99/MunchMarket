import "./style.scss"
import { SpecialGoodSImage } from "../../assets/images/SpecialGoodsImage"
import Goods from "../Goods"

const SpecialGoods = () => {
  return (
    <div className="SPGoodsInner">
      <div className="SPGoodsTextSection">
        <p className="SPGoodsText">🔔금토일 5천원 쿠폰!</p>
              <p className="more-sale-message">더 알뜰한 장보기</p>
        <p className="urgent-message">망설이면 늦어요!</p>
      </div>
      <div className="SPGoodsSection">
        <Goods goodsItem={SpecialGoodSImage} />
      </div>
    </div>
  );
}

export default SpecialGoods