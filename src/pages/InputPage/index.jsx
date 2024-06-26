
import InputSection from "./Section"
import { useForm } from "react-hook-form";
import CategoryId from "./Section/categoryId";
//카테고리 들고오는 부분 만들기
// 이미지를 등록하는 폼
// 불리언값을 등록하는 인풋

const InputPage = () => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm({ mode: "onChange" })
    const onSubmit = ({
      categoryId,
      
      productName,
      basePrice,
      shortDescription,
      stock,
      deliveryDescription,
      packagingTypeId,
      origin,
      unit,
      volume,
      expirationDescription,
      allergyDescription,
      guideDescription,
      productImages,
      productDesTop1,
      productDesTop2,
      productDesTopMain,
      isOnSale,
      salePercentage,
      isPurchaseStatus,
    }) => {
        const body = {
          categoryId,
          productName,
          basePrice,
          shortDescription,
          stock,
          deliveryDescription,
          packagingTypeId,
          origin,
          unit,
          volume,
          expirationDescription,
          allergyDescription,
          guideDescription,
          productImages,
          productDesTop1,
          productDesTop2,
          productDesTopMain,
          isOnSale,
          salePercentage,
          isPurchaseStatus,
        };
        console.log(body)
        reset();
    };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            type="text"
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
        <div>
          <InputSection
            label="packagingTypeId"
            id="packagingTypeId"
            type="text"
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
        <button>送信</button>
      </form>
    </div>
  );
}

export default InputPage;