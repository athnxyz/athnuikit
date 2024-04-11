import { ref } from 'vue';
import { useRouter } from 'vue-router';


export const useNavigateRoute = () => {
  const router = useRouter();
  const navErr = ref<Error>();

  const navigate = (route: `/${string}`): boolean => {
    router.push(route);
    return true;
  };

  return { navigate, navErr };
};