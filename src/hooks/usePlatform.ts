import platforms from "../data/platforms";
// import useData from "./useData";

export interface Platform{
    id:number;
    name:string;
    slug:string;
}

// const usePlatform = () => useData<Platform>("/platforms/lists/parents");
const usePlatform = () => ({data:platforms,error:null})



export default usePlatform;