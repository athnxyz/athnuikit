import type { AsyncExponentialBackoff, BackoffRequestType } from '@uikit/types/AsyncExponentialBackoff';
import { sleep } from '@uikit/utils/Utils';


export const asyncExponentialBackoff: AsyncExponentialBackoff= async <T extends BackoffRequestType>(
  endpoint: string, retries: number, timeout: number, request: T, depth = 1
): Promise<Response> => {
  try {
    if (depth > retries) throw new Error(`Exceeded Max Retries: ${retries}`);
    return fetch(endpoint, request);
  } catch (err) {
    if (depth > retries) throw err;
    
    const updatedTimeout = ((): number => 2 ** (depth - 1) * timeout)();
    await sleep(updatedTimeout);
    
    return asyncExponentialBackoff(endpoint, retries, updatedTimeout, request, depth + 1);
  }
};