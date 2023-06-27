import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
function App() {
  // 根据genre 过滤 渲染game列表  表示选中的genre 
  const [selectedGenre,setSelectedGenre]= useState<Genre | null>(null)
  const [selectedPlatform,setSelectedPlatform]= useState<Platform | null>(null)


  return (
    <> 
      <Grid
        templateAreas={{
          base: `"nav" " main"`,
          lg: `"nav nav" "aside main"`, //992px
        }}
        templateColumns={{ 
          base: "1fr",
          lg: "200px 1fr", //992px
         }}
      >
        <GridItem area="nav" >
         <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" px={5}>
            {/* 这里是将 */}
           <GenreList  selectedGenre={selectedGenre} onSelectGenre={(genre)=>setSelectedGenre(genre)}/>
          </GridItem>
        </Show>
        <GridItem area="main" >
        <PlatformSelector  selectedPlatform={selectedPlatform}  onSelectPlatform={(platform)=>setSelectedPlatform(platform)}/>
          <GameGrid   selectedPlatform={selectedPlatform} selectedGenre={selectedGenre}/>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
