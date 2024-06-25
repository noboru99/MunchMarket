import { useForm } from "react-hook-form";
import "./style.scss";
import AddressSearch from "./AddressSearch";
import { useState } from "react";
import { CheckAuthenticationCode, handleCheckEmailAvailability, handleCheckIDAvailability, handleCheckPhoneVerify } from "../../utils/formHandlers";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFuctions";
import AlertModal from "../../components/AlertModal";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    // id, password, name, phoneNumber, address, gender, birthday;
    const body = {
      loginId: data.loginId,
      password: data.password,
      confirmPassword: data.confirmPassword,
      name: data.name,
      ruby: data.ruby,
      email: data.email,
      phoneNumber: data.phoneNumber,
      sex: data.gender,
      birth: `${data.birthYear}-${data.birthMonth}-${data.birthDay}`,
      postalCode: `${postNumber}`,
      regionAddress: `${deliveredAddress}`,
      detailAddress: data.detailAddress,
      code: data.AuthenticationCode,
      smsVerified: true,
      // smsVerified: `${checkedPhoneVerifiedCode}`,
    };
    dispatch(registerUser(body));
    console.log(body);
    reset();
  };

  const currentYear = new Date().getFullYear();
  const [openModal, setOpenModal] = useState(false);
  const [getPostNumber, setGetPostNumber] = useState(false);
  const [deliveredAddress, setDeliveredAddress] = useState("");
  const [postNumber, setPostNumber] = useState(0);


  //중복확인 상태 영역
  const [isUserIdChecked, setIsUserIdChecked] = useState(false);
  const [isUserEmailChecked, setIsUserEmailChecked] = useState(false);
  const [isPhoneNumberSending, setIsPhoneNumberSending] = useState(false)
  const [checkedPhoneVerifiedCode, setCheckedPhoneVerifiedCode] = useState(false)
  //인증이 오케이된 상태
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [modalErrorMessage, setModalErrorMessage] = useState("")
  // isOpenAlertModal 모달창 영역
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isOpenAlterMode, setIsOpenAlterMode] = useState("")
  const [isOpenAlterMessageCode, setIsOpenAlterMessageCode] = useState()
  //0: 내용을 입력해 1: 사용가능 2: 중복된아이디임 3: 실패
  const validateConfirmPassword = (value) => {
    return value === getValues("password") || "パスワードが一致しません。";
  };
  const userID = {
    
    validate: (value) => {
      const regex = /^(?=.*[a-z])[a-z0-9]{8,20}$/;
      if (!regex.test(value)) {
        return "8字以上20字以下の英文もしくは英文と数字の組み合わせのみ";
      }
      return true;
    },
  };
  const userPassword = {
    required: "英文字/数字/特殊文字全て含めてください。",
    minLength: {
      value: 10,
      message: "10文字以上入力してください。",
    },
    validate: (value) => {
      const hasAlphabet = /[a-zA-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasAlphabet) {
        return "少なくとも 1 つの英文字を含める必要があります。";
      }
      if (!hasNumber) {
        return "少なくとも一つの数字を含める必要があります。";
      }
      if (!hasSpecialChar) {
        return "少なくとも一つの特殊文字を含める必要があります。";
      }
      return true;
    },
  };

  const userConFirmPassword = {
    required: "パスワードをもう一度入力してください",
    validate: validateConfirmPassword,
  };

  const userEmail = {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "有効なメールアドレスを入力してください。",
    },
    required: "Emailを入力してください。",
  };

  const userPhoneNumber = {
    required: "電話番号は必須です。",
    pattern: {
      value: /^\d+$/,
      message: "数字のみ入力してください。",
    },
  };

  const userBirthYear = {
    required: "生年は必須です。",
    pattern: {
      pattern: {
        value: /^\d{4}$/,
        message: "4桁の数字を入力してください。",
      },
      validate: {
        range: (value) =>
          (value >= 1900 && value <= currentYear) ||
          `正確な粘度を入力してください。`,
      },
      message: "4桁の数字を入力してください。",
    },
  };
  const userBirthMonth = {
    required: "月は必須です。",
    pattern: {
      value: /^(0[1-9]|1[0-2])$/,
      message: "01-12の間で入力してください。",
    },
  };
  const userBirthDay = {
    required: "日は必須です。",
    pattern: {
      value: /^(0[1-9]|[12]\d|3[01])$/,
      message: "01-31の間で入力してください。",
    },
  };

  // 중복확인 및 회원가입 보낼때 함수들
  const handleCheckID = async (event) => {
    event.preventDefault();
    const loginId = getValues("loginId");
    const body = {
      loginId
    };
    if (!loginId) {
      console.log("code0");
      setIsOpenAlterMessageCode(0);
      setIsOpenAlterMode("ID");
      setIsOpenAlertModal(true);
      return;
    }
    const response = await handleCheckIDAvailability(
      body,
      setIsLoading,
      setIsUserIdChecked,
      setError
    );
    if (response.result) {
      console.log("response.result", response.result);
      setIsUserIdChecked(true)
      setModalErrorMessage(response.message)
      console.log("code1")
    } else if(!response){
      console.log("code2");
        setModalErrorMessage(error.response.data.message);
      // setIsOpenAlterMessageCode(2);
    }
    setIsOpenAlertModal(true);
    console.log(isLoading);
  };

  const handleCheckPhone = async (event) => {
    event.preventDefault();
    setIsPhoneNumberSending(true)
    const phoneNumber = getValues("phoneNumber");
    const body = {
      phoneNumber,
    };
    const response = await handleCheckPhoneVerify(
      body,
      setIsLoading,
      setIsPhoneNumberSending,
      setError
    );
    // setPhonAuthenticationCode()
    console.log("결과값", response);
  }
  
  const handleCheckAuthenticationCode = async (event) => {
    event.preventDefault();
    const phoneNumber = getValues("phoneNumber");
    const code = getValues("AuthenticationCode");
    const body = {
      phoneNumber,
      code,
    };
    const response = await CheckAuthenticationCode(
      body,
      setIsLoading,
      setCheckedPhoneVerifiedCode,
      setError
    );
    if (response.result) {
      setCheckedPhoneVerifiedCode(true)
    }
    console.log("error", error);
    console.log("돌아온 결과값", response);
  }

  const handleCheckEmail = async (event) => {
    event.preventDefault();
    const email = getValues("email");
    if (!email) {
      console.log("code0");
      setIsOpenAlterMessageCode(0);
      setIsOpenAlterMode("Email");
      setIsOpenAlertModal(true);
      return;
    }
    const body = {
      email
    }
    const response = await handleCheckEmailAvailability(
      body,
      setIsLoading,
      setIsUserEmailChecked,
      setError
    );
    if (response.result) {
      setIsUserEmailChecked(true);
      setIsOpenAlterMessageCode(1);
      setIsOpenAlterMode("Email");
      console.log("code1");
    } else if (!response) {
      console.log("code2");
      // setIsOpenAlterMessageCode(2);
      setModalErrorMessage(error.response.data.message);
    }
    setIsOpenAlertModal(true);
    console.log(isLoading);
  }

  return (
    <div className="registerFormSection">
      {/* 중복확인모달 */}
      {isOpenAlertModal && (
        <div className="modalSection">
          <AlertModal
            setIsOpenAlertModal={setIsOpenAlertModal}
            mode={isOpenAlterMode}
            messageCode={isOpenAlterMessageCode}
            setModalErrorMessage={setModalErrorMessage}
            modalErrorMessage={modalErrorMessage}
          />
        </div>
      )}
      {/* 주소모달 */}
      {openModal && (
        <div className="modalSection">
          <AddressSearch
            openModal={openModal}
            setOpenModal={setOpenModal}
            setGetPostNumber={setGetPostNumber}
            setDeliveredAddress={setDeliveredAddress}
            setPostNumber={setPostNumber}
          />
        </div>
      )}
      <div className="register">会員登録</div>
      <div className="Required">
        <span>*</span>必須項目
      </div>
      <div className="registerFomBox">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {/* 아이디 입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="loginId">ID</label> <span>*</span>
            </div>
            <div className="inputSection">
              <input
                type="text"
                id="loginId"
                placeholder="IDを入力してください。"
                onChange={() => trigger("loginId")}
                {...register("loginId", userID)}
              />
              {errors?.id && (
                <div className="errorMessageSection">
                  <span className="errorMessage">{errors.id.message}</span>
                </div>
              )}
            </div>
            {/* 아이디중복확인 */}
            {isUserIdChecked ? (
              <div className="overlapSection">
                <button disabled={isUserIdChecked} className="completedBtn">
                  確認完了
                </button>
              </div>
            ) : (
              <div className="overlapSection">
                <button onClick={handleCheckID}>重複確認</button>
              </div>
            )}
          </div>
          {/* 비밀번호 입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="password">パスワード </label>
              <span>*</span>
            </div>
            <div className="inputSection">
              <input
                type="password"
                id="password"
                placeholder="パスワードを入力してください。"
                onChange={() => trigger("password")}
                {...register("password", userPassword)}
              />
              {errors?.password && (
                <div className="errorMessageSection">
                  <span className="errorMessage">
                    {errors.password.message}
                  </span>
                </div>
              )}
            </div>
            <div className="overlapSection"></div>
          </div>
          {/* 비밀번호확인 입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="confirmPassword">パスワード確認</label>
              <span>*</span>
            </div>
            <div className="inputSection">
              <input
                type="password"
                id="confirmPassword"
                placeholder="パスワードをもう一度入力してください。"
                onChange={() => trigger("confirmPassword")}
                {...register("confirmPassword", userConFirmPassword)}
              />
              {errors?.confirmPassword && (
                <div className="errorMessageSection">
                  <span className="errorMessage">
                    {errors.confirmPassword.message}
                  </span>
                </div>
              )}
            </div>
            <div className="overlapSection"></div>
          </div>
          {/* 이름입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="name">名前</label>
              <span>*</span>
            </div>
            <div className="inputSection">
              <input
                type="text"
                id="name"
                placeholder="名前を入力してください。"
                {...register("name", { required: "名前を入力してください。" })}
              />
              {errors?.name && (
                <div className="errorMessageSection">
                  <span className="errorMessage">{errors.name.message}</span>
                </div>
              )}
            </div>
          </div>
          {/* フリガナ입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="ruby">フリガナ</label>
              <span>*</span>
            </div>
            <div className="inputSection">
              <input
                type="text"
                id="ruby"
                placeholder="フリガナを入力してください。"
                {...register("ruby", {
                  required: "フリガナを入力してください。",
                })}
              />
              {errors?.ruby && (
                <div className="errorMessageSection">
                  <span className="errorMessage">{errors.ruby.message}</span>
                </div>
              )}
            </div>
          </div>
          {/* 이메일입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="email">メール</label>
              <span>*</span>
            </div>
            <div className="inputSection">
              <input
                type="email"
                id="email"
                placeholder="例:MunchyMarket@Munchy.com"
                onChange={() => trigger("email")}
                {...register("email", userEmail)}
              />
              {errors?.email && (
                <div className="errorMessageSection">
                  <span className="errorMessage">{errors.email.message}</span>
                </div>
              )}
            </div>
            {/* 이메일중복확인 */}
            {isUserEmailChecked ? (
              <div className="overlapSection">
                <button disabled={isUserEmailChecked} className="completedBtn">
                  確認完了
                </button>
              </div>
            ) : (
              <div className="overlapSection">
                <button onClick={handleCheckEmail}>重複確認</button>
              </div>
            )}
          </div>
          {/* 휴대폰전화번호입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="phoneNumber">携帯電話</label>
              <span>*</span>
            </div>
            <div className="inputSection">
              <input
                id="phoneNumber"
                type="text"
                placeholder="数字だけ入力してください。"
                onChange={() => trigger("phoneNumber")}
                {...register("phoneNumber", userPhoneNumber)}
              />
              {errors?.phoneNumber && (
                <div className="errorMessageSection">
                  <span className="errorMessage">
                    {errors.phoneNumber.message}
                  </span>
                </div>
              )}
            </div>
            {/* 휴대폰번호인증버튼 */}
            {isPhoneNumberSending ? (
              <div className="overlapSection">
                <button
                  disabled={isPhoneNumberSending}
                  className="completedBtn"
                >
                  送信完了
                </button>
              </div>
            ) : (
              <div className="overlapSection">
                <button onClick={handleCheckPhone}>認証番号を取得</button>
              </div>
            )}
          </div>
          {/* 휴대폰번호인증입력창 */}
          {isPhoneNumberSending && (
            <div className="InputBox">
              <div className="Text">
                <label htmlFor="AuthenticationCode">認証番号</label>
                <span>*</span>
              </div>
              <div className="inputSection">
                <input
                  id="AuthenticationCode"
                  type="text"
                  placeholder="認証番号を入力してください。"
                  onChange={() => trigger("AuthenticationCode")}
                  {...register("AuthenticationCode", {
                    required: "認証番号は必須です。",
                    pattern: {
                      value: /^\d+$/,
                      message: "数字のみ入力してください。",
                    },
                  })}
                />
                {errors?.AuthenticationCode && (
                  <div className="errorMessageSection">
                    <span className="errorMessage">
                      {errors.AuthenticationCode.message}
                    </span>
                  </div>
                )}
              </div>
              {/* 인증확인 및 완료버튼 */}
              {checkedPhoneVerifiedCode ? (
                <div className="overlapSection">
                  <button
                    disabled={checkedPhoneVerifiedCode}
                    className="completedBtn"
                  >
                    認証完了
                  </button>
                </div>
              ) : (
                <div className="overlapSection">
                  <button onClick={handleCheckAuthenticationCode}>
                    認証する
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 주소입력창 */}
          {getPostNumber ? (
            <div className="InputBox">
              <div className="Text">
                <label htmlFor="">住所</label>
                <span>*</span>
              </div>
              <div className="inputSection">
                <div className="inputSection">
                  <span className="deliveredAddress">{postNumber}</span>
                </div>
                <div className="inputSection">
                  <span className="deliveredAddress">{deliveredAddress}</span>
                </div>
                <div className="inputSection">
                  <input
                    id="detailAddress"
                    type="text"
                    placeholder="詳しい住所を入力してください。"
                    {...register("detailAddress")}
                  />
                </div>
                <span className="infoMessage">
                  配送先によって商品情報が異なる場合がございます
                </span>
              </div>
              <div className="overlapSection">
                <button
                  className="moreSearchBtn"
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenModal(true);
                  }}
                >
                  <img
                    src="https://res.kurly.com/pc/service/cart/2007/ico_search.svg"
                    alt=""
                  />
                  再検索
                </button>
              </div>
            </div>
          ) : (
            <div className="InputBox">
              <div className="Text">
                住所<span>*</span>
              </div>
              <div className="inputSection">
                {/* 주소입력버튼 */}
                <button
                  className="addressBtn"
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenModal(true);
                  }}
                >
                  <img
                    src="https://res.kurly.com/pc/service/cart/2007/ico_search.svg"
                    alt=""
                  />
                  住所検索
                </button>
                <span className="infoMessage">
                  配送先によって商品情報が異なる場合がございます
                </span>
              </div>
            </div>
          )}
          {/* 성별입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="">性別</label>
            </div>
            <div className="inputSection radioSection">
              <label htmlFor="genderMan" className="radioLabel">
                <input
                  id="genderMan"
                  name="gender"
                  value="男"
                  type="radio"
                  className="radioInput"
                  {...register("gender")}
                />
                <span className="radioBtnOut">
                  <div className="radioBtnIn"></div>
                </span>
                <span className="radioText">男生</span>
              </label>

              <label htmlFor="genderGirl" className="radioLabel">
                <input
                  id="genderGirl"
                  name="gender"
                  value="女"
                  type="radio"
                  className="radioInput"
                  {...register("gender")}
                />
                <span className="radioBtnOut">
                  <div className="radioBtnIn"></div>
                </span>
                <span className="radioText">女生</span>
              </label>

              <label htmlFor="genderNO" className="radioLabel">
                <input
                  id="genderNO"
                  name="gender"
                  value="選択なし"
                  type="radio"
                  className="radioInput"
                  {...register("gender")}
                />
                <span className="radioBtnOut">
                  <div className="radioBtnIn"></div>
                </span>
                <span className="radioText">選択なし</span>
              </label>
            </div>
            <div className="overlapSection"></div>
          </div>
          {/* 생년월일입력창 */}
          <div className="InputBox">
            <div className="Text">
              <label htmlFor="birthday">生年月日</label>
            </div>
            <div className="inputSection">
              <div className="birthInputSection">
                <div>
                  <input
                    id="birthYear"
                    type="text"
                    placeholder="YYYY"
                    onChange={() =>
                      trigger(["birthYear", "birthMonth", "birthDay"])
                    }
                    {...register("birthYear", userBirthYear)}
                  />
                </div>
                <span>/</span>
                <div>
                  <input
                    id="birthMonth"
                    type="text"
                    placeholder="MM"
                    onChange={() =>
                      trigger(["birthYear", "birthMonth", "birthDay"])
                    }
                    {...register("birthMonth", userBirthMonth)}
                  />
                </div>
                <span>/</span>
                <div>
                  <input
                    id="birthDay"
                    type="text"
                    placeholder="DD"
                    onChange={() =>
                      trigger(["birthYear", "birthMonth", "birthDay"])
                    }
                    {...register("birthDay", userBirthDay)}
                  />
                </div>
              </div>
              {errors?.birthYear && (
                <div className="errorMessageSection">
                  <span className="errorMessage">
                    {errors.birthYear.message}
                  </span>
                </div>
              )}
              {errors?.birthMonth && (
                <div className="errorMessageSection">
                  <span className="errorMessage">
                    {errors.birthMonth.message}
                  </span>
                </div>
              )}
              {errors?.birthDay && (
                <div className="errorMessageSection">
                  <span className="errorMessage">
                    {errors.birthDay.message}
                  </span>
                </div>
              )}
            </div>
            <div className="overlapSection"></div>
          </div>
          <div className="InputBox">
            <div className="Text"></div>
            <div className="inputSection">
              <button className="registerBtn">送信</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
