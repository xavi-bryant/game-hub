import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}
const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  // 取消 请求 controller
  useEffect(() => {
  const controller = new AbortController();
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) =>{
        // 如果这个err 是 CanceledError 就不要处理了
        if(err instanceof CanceledError) return ;
        setError(err.message)
      } );
      // 返回一个函数，这个函数会在组件卸载的时候执行  中止该控制器关联的任何挂起的请求
    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
