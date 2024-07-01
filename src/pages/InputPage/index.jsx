import "./style.scss"
import InputSection from "./Section"
import { useForm } from "react-hook-form";
import CategoryId from "./Section/categoryId";
import FileUpload from "./Section/FileUpload";
import { productRegister } from "../../store/thunkFuctions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PackingTypeId from "./Section/PackagingTypeId";

//카테고리 들고오는 부분 만들기
// 이미지를 등록하는 폼
// 불리언값을 등록하는 인풋

const InputPage = () => {
  const goods = useSelector((state) => state.goods)
  console.log("goods", goods.goodsData)
  const [getImages, setGetImages] = useState(null)
  const dispatch = useDispatch()
    const {
        register,
      handleSubmit,
        setValue,
        reset
    } = useForm({ mode: "onChange" })
    const onSubmit = (data) => {
      const { mainImage, subImage, ...restData } = data;

      const body = {
        ...restData,
        images: {
          mainImage, // 배열이 아니라면 그냥 파일 객체를 할당
          subImage, // 배열이 아니라면 그냥 파일 객체를 할당/ 파일 객체의 첫 번째 요소
        },
      };
      
      dispatch(productRegister({ data: body, setGetImages }));
      console.log(getImages)
      reset();
    };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}
      className="inputFormDataSection">
        {/* 카테고리id */}

        <div>
          <CategoryId
            label="categoryId"
            id="categoryId"
            register={register("categoryId")}
          />
        </div>
        <div>
          <InputSection
            label="productName"
            id="productName"
            type="text"
            register={register("productName")}
          />
        </div>
        <div>
          <InputSection
            label="basePrice"
            id="basePrice"
            type="number"
            register={register("basePrice")}
          />
        </div>
        <div>
          <InputSection
            label="shortDescription"
            id="shortDescription"
            type="text"
            register={register("shortDescription")}
          />
        </div>
        <div>
          <InputSection
            label="stock"
            id="stock"
            type="number"
            register={register("stock")}
          />
        </div>
        <div>
          <InputSection
            label="deliveryDescription"
            id="deliveryDescription"
            type="text"
            register={register("deliveryDescription")}
          />
        </div>
        {/* <div>
          <InputSection
            label="packagingTypeId"
            id="packagingTypeId"
            type="number"
            register={register("packagingTypeId")}
          />
        </div> */}
        <div>
          <PackingTypeId
            label="deliveryDescription"
            id="deliveryDescription"
            register={register("packagingTypeId")}
          />
        </div>

        <div>
          <InputSection
            label="origin"
            id="origin"
            type="text"
            register={register("origin")}
          />
        </div>
        <div>
          <InputSection
            label="unit"
            id="unit"
            type="text"
            register={register("unit")}
          />
        </div>
        <div>
          <InputSection
            label="volume"
            id="volume"
            type="text"
            register={register("volume")}
          />
        </div>
        <div>
          <InputSection
            label="expirationDescription"
            id="expirationDescription"
            type="text"
            register={register("expirationDescription")}
          />
        </div>
        <div>
          <InputSection
            label="allergyDescription"
            id="allergyDescription"
            type="text"
            register={register("allergyDescription")}
          />
        </div>
        <div>
          <InputSection
            label="guideDescription"
            id="guideDescription"
            type="text"
            register={register("guideDescription")}
          />
        </div>
        {/* 이미지 부분 */}

        <div>
          <InputSection
            label="productDesTop1"
            id="productDesTop1"
            type="text"
            register={register("productDesTop1")}
          />
        </div>
        <div>
          <InputSection
            label="productDesTop2"
            id="productDesTop2"
            type="text"
            register={register("productDesTop2")}
          />
        </div>
        <div>
          <InputSection
            label="productDesTopMain"
            id="productDesTopMain"
            type="text"
            register={register("productDesTopMain")}
          />
        </div>
        <div>
          <InputSection
            label="isOnSale"
            id="isOnSale"
            type="checkBox"
            register={register("isOnSale")}
          />
        </div>
        <div>
          <InputSection
            label="salePercentage"
            id="salePercentage"
            type="number"
            register={register("salePercentage")}
          />
        </div>
        <div>
          <InputSection
            label="isPurchaseStatus"
            id="isPurchaseStatus"
            type="checkBox"
            register={register("isPurchaseStatus")}
          />
        </div>

        <div>
          <FileUpload setValue={setValue} name="mainImage" />
        </div>

        <div>
          <FileUpload setValue={setValue} name="subImage" />
        </div>
        <button>送信</button>
      </form>
      <div>
        {getImages && (
          <img
            src={getImages}
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </div>

      <div>
        
      </div>
    </div>
  );
}

export default InputPage;