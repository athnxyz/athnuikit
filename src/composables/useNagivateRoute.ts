import { useRouter } from 'vue-router';


export const useNavigateRoute = () => {
  const router = useRouter();

  const navigate = (route: `/${string}`): boolean => {
    router.push(route);
    return true;
  }

  return { navigate };
};