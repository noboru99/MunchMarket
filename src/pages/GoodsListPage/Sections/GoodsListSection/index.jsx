import { useState } from "react";
import { goods } from "../../../../assets/data/goods";
import Goods from "../../../../components/Goods";
import "./style.scss"
const GoodsListSection = () => {
    const sorts = [
      { id: 1, name: "추천순", key: "recommend", className: "" },
      { id: 2, name: "신상품순", key: "new", className: "sortItem" },
      { id: 3, name: "판매량순", key: "sales", className: "sortItem" },
      { id: 4, name: "혜택순", key: "benefits", className: "sortItem" },
      { id: 5, name: "낮은가격순", key: "lowPrice", className: "sortItem" },
      { id: 6, name: "높은가격순", key: "highPrice", className: "sortItem" },
    ];
    const [selectedSort, setSelectedSort] = useState(1)
    const handleSelect = (id) => {
      setSelectedSort(id);
    };
return (
  <div className="goodsListSectionInner">
    <div className="goodsTotalAndSortSection">
      <p className="goodsTotal">총 116건</p>
      <ul className="sortSection">
        {sorts.map((sort) => (
          <li
            className={`${sort.className} ${selectedSort === sort.id ? "selected" : ""}`}
            key={sort.key}
            onClick={() => handleSelect(sort.id)}
          >
                <a href="#"
                onClick={(e)=> e.preventDefault()}>{sort.name}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className="goodsSection">
      {goods.map((goodsItem) => (
        <Goods
          key={goodsItem.id}
          goodsItem={goodsItem}
          className="goodsList-goods"
        />
      ))}
    </div>
  </div>
);
};

export default GoodsListSection;