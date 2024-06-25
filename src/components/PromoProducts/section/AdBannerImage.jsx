
import { AdBannerImagesUrl } from "../../../assets/images/AdBannerImg";


const AdBannerImage = () => {
  return (
    <div className="ad-banner-container">
      <img
        src={AdBannerImagesUrl.imgUrl}
        alt={`광고 배너 ${AdBannerImagesUrl.id}`}
      />
    </div>
  );
};

export default AdBannerImage;
