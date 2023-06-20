import { useCallback, useEffect, useState } from 'react';

import { api } from '../../services/api';
import * as T from './types';

const apiFunctions = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
} as const;

export function useFetch<Body, Response>({
  url,
  body,
  method = 'GET',
  lateRequest = true,
  headers,
}: T.UseFetchProps<Body>) {
  const [data, setData] = useState<Response | undefined>();
  const [error, setError] = useState<T.ApiError<Response> | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const clearError = () => setError(undefined);
  const clearData = () => setData(undefined);

  const fetch = useCallback(
    async (config?: Partial<Pick<T.UseFetchProps<Body>, 'url' | 'body'>>) => {
      const urlToFetch = encodeURI(config?.url ?? url);
      const bodyToFetch = config?.body ?? body;

      if (urlToFetch.includes('undefined')) {
        return undefined;
      }

      clearData();
      clearError();
      setIsLoading(true);

      try {
        const response = await (async () => {
          if (['GET', 'DELETE'].includes(method)) {
            return api[apiFunctions[method]]<Response>(urlToFetch, { headers });
          }

          return api[apiFunctions[method]]<Response>(urlToFetch, bodyToFetch, {
            headers,
          });
        })();
        setData(response?.data);
      } catch (responseError) {
        const _error = responseError as T.ApiError<Response>;
        setError(_error);
        return responseError;
      } finally {
        setIsLoading(false);
      }
    },
    [body, method, url, headers],
  );

  useEffect(() => {
    if (!data && !error && !lateRequest && url) {
      fetch();
    }
  }, [data, error, fetch, lateRequest, url]);

  return { data, isLoading, error, fetch, clearData, clearError };
}
