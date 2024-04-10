import { ref } from 'vue';
import { useRouter } from 'vue-router';


export const useNavigateRoute = <T extends (...args: any[]) => void>() => {
  const router = useRouter();
  const navErr = ref<Error>();

  const pushRoute = (route: `/${string}`): boolean => {
    router.push(route);
    return true;
  };

  const navigate = (route: `/${string}`, fn?: T) => {
    if (fn) {
      return (...args: Parameters<T>) => {
        const attemptSideEffect = () => {
          try {
            fn(...args);
          } catch (err) { navErr.value = err as Error; }
        };

        attemptSideEffect();
        return pushRoute(route);
      }
    }

    return pushRoute(route);
  }

  return { navigate };
};