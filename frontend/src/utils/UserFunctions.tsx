import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

// 회원가입 data
type SignupData = {
  email: string;
  name: string;
  password: string;
  gender: string;
  birthday: string;
};

// 로그인 params
type LoginData = {
  email: string;
  password: string;
};

// 토큰 저장하기
const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

// 회원가입
export function userSignup(data: SignupData): Promise<void> {
  return axiosWithoutAuth
    .post('/api/user/signup', { data: data })
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 로그인 (비동기 반환 x)
// export function userLogin(data: LoginParams) {
//   // 토큰 저장
//   axiosWithAuth
//     .post('/api/user/login', data)
//     .then((r) => {
//       console.log(r);
//     // 여기서 나온 데이터가 토큰이랑 id값 등
//     // 스토리지에 저장
//     })
//     .catch((e) => {
//       console.error(e);
//     });

//   const key = 'myToken';
//   const myToken = '';
//   storeData(key, myToken);
// }

export function userLogin(data: LoginData): Promise<void> {
  return axiosWithAuth
    .post('/api/user/login', { data: data })
    .then((response) => {
      console.log(response);

      const refreshToken = response.data.refreshToken;
      const memberId = response.data.memberId;

      storeData('refreshToken', refreshToken);
      storeData('memberId', memberId);
    })
    .catch((e) => {
      console.error(e);
      throw e; // 에러를 다시 던져서, 함수를 호출하는 측에서 catch 가능하도록 합니다.
    });
}

// 소셜 로그인
// 아직 잘 몰라서 보류
export function userSocialLogin(): Promise<void> {
  return axiosWithoutAuth
    .post('/api/user/?login')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 비밀번호 재발급
export function userFindPassword(): Promise<void> {
  return axiosWithAuth
    .get('/api/user/findpw')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 로그아웃
export function userLogout(): Promise<void> {
  return axiosWithAuth
    .get('/api/user/logout')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}