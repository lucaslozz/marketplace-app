// import { useFetch } from '../../../hooks/useFetch';
// import { UseFetchProps } from '../../../hooks/useFetch/types';

// const endpoint = () => '/sessions/';

// type Params = {
//   options?: Partial<UseFetchProps>;
// };

// type User = {
//   id: string;
//   avatar: string;
//   name: string;
//   email: string;
//   tel: number;
//   created_at: Date;
//   updated_at: Date;
// };

// type Response = {
//   token: string;
//   user: User;
//   'refresh-token': string;
// };

// export type Body = {
//   email: string;
//   password: string;
// };

// const useLogin = ({ options }: Params) =>
//   useFetch<Body, Response>({
//     url: endpoint(),
//     method: 'POST',
//     ...options,
//   });

// export default useLogin;
