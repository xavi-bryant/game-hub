// 获得 genres 数据
// import useData from "./useData";
import genres from '../data/genres'
export interface Genre {
  image_background: string ;
  id: number;
  name: string;
}

// const useGenres = () => useData<Genre>("/genres");
const useGenres = () => ({data:genres,loading:false,error:null})

export default useGenres;
