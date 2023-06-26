// 封装了一个 useData 的 hook，用于获取数据

import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData =<T>(endpoint:string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // 取消 请求 controller
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
      .then((res) => {
        setLoading(false);
        setData(res.data.results);
      })
      .catch((err) => {
        // 如果这个err 是 CanceledError 就不要处理了
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    // 返回一个函数，这个函数会在组件卸载的时候执行  中止该控制器关联的任何挂起的请求
    return () => controller.abort();
  }, []);

  return { data, error, loading };
};

export default useData;
