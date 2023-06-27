import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Genre } from "./useGenres";
import useData from "./useData";
import { GameQuery } from "../App";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  // 整个对象是数组 但是我们只需要里面的platform 因为只是定义了platform的泛型Platform
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

// 通过game 中的genres 的id  和选中的id 相等 来过滤
const useGames = (
  gameQuery: GameQuery | null
  // selectedGenre: Genre | null,
  // selectedPlatform: Platform | null
) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery?.genre?.id,
        platforms: gameQuery?.platform?.id,
        ordering: gameQuery?.sortOrder,
        search: gameQuery?.searchText,
      },
    },
    // [selectedGenre?.id, selectedPlatform?.id]
    [gameQuery]
  );

export default useGames;
