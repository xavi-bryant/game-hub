import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Genre {
  id: number;
  name: string;
}
interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // 取消 请求 controller
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchGenresResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setLoading(false);
        setGenres(res.data.results);
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

  return { genres, error, loading };
};

export default useGenres;
