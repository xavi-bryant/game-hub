import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform{
    id: number;
    name: string;
    slug: string;
}
export  interface Game {
  id: number;
  name: string;
  background_image: string;
  // 整个对象是数组 但是我们只需要里面的platform 因为只是定义了platform的泛型Platform
  parent_platforms: {platform: Platform}[];
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
