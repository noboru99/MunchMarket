import { useSelector } from "react-redux";


const MyPage = () => {
  const userData = useSelector(state => state?.user.userData)
  return (
    <div>
      <p>userID: {userData.id}</p>
      <p>userLoginId: {userData.loginId}</p>
      <p>userName: {userData.name}</p>
      <p>userRuby:{userData.ruby}</p>
      <p>userEmail:{userData.email}</p>
      <p>userPhoneNumber:{userData.phoneNumber}</p>
    </div>
  );
}

export default MyPage;