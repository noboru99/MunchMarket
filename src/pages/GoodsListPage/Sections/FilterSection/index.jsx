import "./style.scss"
const FilterSection = () => {
  return (
    <div className="filterSectionInner">
      <div className="filterRestSection">
        <p className="filterText">필터</p>
        <button className="resetBtn">초기화</button>
      </div>
      <div>
        가격
      </div>
      <div>
        브랜드
      </div>
      <div>
        혜택
      </div>
    </div>
  )
}

export default FilterSection