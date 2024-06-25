import { moreIcon } from "../../assets/images/imageUrls";
import Goods from "../Goods";
import { goods } from "../../assets/data/goods";
import "./style.scss"
import { useEffect, useState } from "react";
import AdBannerImage from "./section/AdBannerImage";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const PromoProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const limit = 4;
  const itemWidth = 249;
  const itemMarginRight = 18;
  const totalItemWidth = itemWidth + itemMarginRight;
  const totalSlides = Math.ceil(goods.length / limit);
  const translateX =
    currentIndex * limit * totalItemWidth - currentIndex * itemMarginRight;
  const [leftBtnOn, setLeftBtnOn] = useState(false)
  const [rightBtnOn, setRightBtnOn] = useState(true)
  useEffect(() => {
    
    if (currentIndex === totalSlides - 1) {
      setRightBtnOn(false);
    } else if (currentIndex === 0) {
      setLeftBtnOn(false);
    } else {
      setLeftBtnOn(true);
      setRightBtnOn(true);
    }
    
  }, [currentIndex])
  
  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      
    } 
  }

  const handleRightClick = () => {
    if (currentIndex < totalSlides -1) {
      setCurrentIndex(currentIndex + 1);
    } 
  };
  return (
    <div className="PromoProductsSection">
      <div className="PromoProductsTitle">
        <span>🛒지금 가장 많이 담는 특가</span>
        <span>
          <img src={moreIcon} alt="더보기 아이콘" />
        </span>
      </div>

      <div className="PromoProductsSubTitle">
        <span>컬리 추천 특가템 최대 30%</span>
      </div>
      <div className="buttonPosition">
        <div className="goodsList">
          {leftBtnOn && (
            <button className="leftBtn" onClick={handleLeftClick}>
              <IoIosArrowBack />
            </button>
          )}
          <div
            className="goodsInner"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {goods.map((goodsItem, index) => (
              <Goods
                key={goodsItem.id}
                goodsItem={goodsItem}
                className={`GoodsItems ${
                  (index + 1) % limit === 0 ? "no-margin" : ""
                }`}
              />
            ))}
          </div>
          {rightBtnOn && (
            <button className="rightBtn" onClick={handleRightClick}>
              <IoIosArrowForward />
            </button>
          )}
        </div>
      </div>
      <AdBannerImage />
    </div>
  );
}

export default PromoProducts