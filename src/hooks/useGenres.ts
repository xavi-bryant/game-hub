// 获得 genres 数据
import useData from "./useData";

export interface Genre {
  image_background: string ;
  id: number;
  name: string;
}

const useGenres = () => useData<Genre>("/genres");

export default useGenres;
