import { useEffect, useState } from "react";
import { goods } from "../../../../assets/data/goods";
import Goods from "../../../../components/Goods";
import "./style.scss"
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axios";
//Params를 이용하여 URL의 정보를 들고온 후
const GoodsListSection = () => {
  const { categoryId } = useParams()
  const [goodsSort, setGoodsSort] = useState(null)
  const [selectedSort, setSelectedSort] = useState(1);
  //sort부분 요청하기
  useEffect(() => {
    // try {
    //   // const getGoodsList = async () => {
    //   //   const response = await axiosInstance.get(`/goods?categoryId=${categoryId}`);
    //   //   console.log("response", response.data.data)
    //   //   setGoods(response.data.data)
    //   // }
    // } catch (error) {
    // }
    const getSort = async () => { 
      try {
        const response = await axiosInstance.get(`categories/sort-types`);
        console.log("response", response.data.data);
        setGoodsSort(response.data.data);
      } catch (error) {
        console.log("statusCode", error.response.status);
        console.log("messageCode", error.response.data.message);
        return false;
      }
      
    }
    getSort()
  }, [categoryId]);
  if(!goodsSort) return <div>Loading...</div>
  
    // const sorts = [
    //   { id: 1, name: "추천순", key: "recommend", className: "" },
    //   { id: 2, name: "신상품순", key: "new", className: "sortItem" },
    //   { id: 3, name: "판매량순", key: "sales", className: "sortItem" },
    //   { id: 4, name: "혜택순", key: "benefits", className: "sortItem" },
    //   { id: 5, name: "낮은가격순", key: "lowPrice", className: "sortItem" },
    //   { id: 6, name: "높은가격순", key: "highPrice", className: "sortItem" },
    // ];
    
    const handleSelect = (id) => {
      setSelectedSort(id);
    };
return (
  <div className="goodsListSectionInner">
    <div className="goodsTotalAndSortSection">
      <p className="goodsTotal">총 116건</p>
      <ul className="sortSection">
        {goodsSort.map((sort) => (
          <li
            className={` ${
              selectedSort === sort.sortTypeId ? "selected" : ""
            }`}
            key={sort.sortTypeId}
            onClick={() => handleSelect(sort.sortTypeId)}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>
              {sort.displayName}
            </a>
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
//${sort.className}
export default GoodsListSection;