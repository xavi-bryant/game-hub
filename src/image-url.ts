

const getCroppedImageUrl =(url:string)=>{
    //https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg
    // indexOf() 是 JavaScript 字符串的方法，用于查找指定子字符串在原字符串中第一次出现的位置。它返回子字符串在原字符串中的索引值，如果找不到该子字符串，则返回 -1
    //https://media.rawg.io/media/
    // url.slice(0, index) 将返回从字符串 url 的起始位置到 index 之前的部分字符串。这样可以截取 url 字符串中 "media/" 之前的部分。
    // url.slice(index) 是一个 JavaScript 代码片段，用于从字符串 url 中提取从 index 位置到字符串末尾的部分字符串。
    if(!url) return '';//如果url不存在就返回空字符串
    const target = "media/";
    const index =url.indexOf(target)+target.length;
   return url.slice(0,index)+'crop/600/400/'+url.slice(index);   
}

export default getCroppedImageUrl