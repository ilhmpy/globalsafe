import { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/HubContext";

export function useFetch<T>(): [
  T | null,
  boolean,
  boolean,
  (url: string, ...val: (number | number[])[]) => void
] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [options, setOptions] = useState<(number | number[])[]>([]);
  const [method, setMethod] = useState<string>("");
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  const doFetch = useCallback((url: string, ...args: (number | number[])[]) => {
    setMethod(url);
    setOptions(args);
    setIsLoading(true);
  }, []);

  // useEffect(() => {
  //     if (options.length === 0) {
  //         return
  //     }

  //     if (hubConnection) {
  //         hubConnection
  //             .invoke<T>(method, ...options)
  //             .then((res) => {
  //                 // console.log("res", res)
  //                 setResponse(res)
  //                 setIsLoading(false)
  //             })
  //             .catch((e) => {
  //                 setError(true)
  //                 setIsLoading(false)
  //             })
  //     }
  // }, [isLoading, hubConnection, method])
  return [response, error, isLoading, doFetch];
}
