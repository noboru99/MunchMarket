import axios from "axios";
// import store from "../store/index"
// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://15.152.139.214:8080/api/member/", // 서버 URL
  headers: {
    "Content-Type": "application/json", // 모든 요청에 대해 JSON 포맷으로 설정
    Accept: "application/json", // 서버에서 JSON 응답을 기대
    // 필요한 경우 추가 헤더 설정
  },
  withCredentials: true, // 쿠키를 포함하여 요청
});

// axiosInstance.interceptors.request.use(function (config) {
  // const state = store.getState();
// const token = state.user?.accessToken; 
// if (token) {
  //   config.headers.Authorization = `Bearer ${token}` 
// }

//  }, function(error){
//   return Promise.reject(error)
// })

export default axiosInstance;

