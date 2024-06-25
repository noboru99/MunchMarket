import "./style.scss"
import { BannerImgUrl } from "../../assets/images/bannerImg"
import { useEffect, useState } from "react";
const MainBanner = () => {
  const [bannerImg, setBannerImg] = useState(0)
  const handleLeftChange = () => {
    setBannerImg((prevIndex) =>
      prevIndex === 0 ? BannerImgUrl.length - 1 : prevIndex - 1
    );
  };
  const handleRightChange = () => {
     setBannerImg((prevIndex) =>
       prevIndex === BannerImgUrl.length - 1 ? 0 : prevIndex + 1
     );
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerImg((prevIndex) =>
        prevIndex === BannerImgUrl.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
     return () => clearInterval(interval);
  }, [])
  
  console.log(BannerImgUrl);
  return (
    <div className="MainBannerImg">
      <button className="leftBtn" onClick={() => handleLeftChange()}>
        왼
      </button>
      <div
        className="BannerImgInner"
        style={{ transform: `translateX(-${bannerImg * 100}%)` }}
      >
        {BannerImgUrl.map((banner, index) => (
          <li key={index}>
            <img src={banner.ImgUrl} alt={`banner-${index}`} />
          </li>
        ))}
      </div>
      <button className="rightBtn" onClick={() => handleRightChange()}>
        오
      </button>
    </div>
  );
}

export default MainBanner