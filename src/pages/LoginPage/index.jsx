import { useForm } from "react-hook-form";
import "./style.scss"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/thunkFuctions";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    const body = {
      loginID: data.loginID,
      loginPassword: data.loginPassword
    };

    console.log(
      "body",body
    )
    dispatch(loginUser(body))

    reset();
  };
  const userData = useSelector(state => state.user?.userData)
  console.log(userData)
  return (
    <div className="loginSection">
      <div className="loginText">Login</div>
      <div className="loginFormBox">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="idInputBox" htmlFor="loginID">
            <input
              id="loginID"
              type="text"
              placeholder="IDを入力してください。"
              {...register("loginID")}
            />
          </label>
          <label className="passwordInputBox" htmlFor="loginPassword">
            <input
              id="loginPassword"
              type="password"
              placeholder="パスワードを入力してください。"
              {...register("loginPassword")}
            />
          </label>
          <div className="FindCredentialsContainer">
            <span>IDを探す </span>
            <span> | </span>
            <span>パスワードを探す</span>
          </div>
          <div className="BtnSection">
            <button className="loginBtn">ログインする</button>
            <button className="registerBtn">会員登録する</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage