import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder:string;
  searchText:string
}
function App() {
  // 根据genre 过滤 渲染game列表  表示选中的genre
  // const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  // const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
  //   null
  // );
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  console.log(gameQuery);
  

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
        <GridItem area="nav">
          <NavBar onSearch={(searchText)=>setGameQuery({...gameQuery,searchText})}/>
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" px={5}>
            {/* 这里是将 */}
            <GenreList
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) => {
                setGameQuery({ ...gameQuery, genre });
              }}
            />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box pl={2} mb={3} >
            <GameHeading  gameQuery={gameQuery} />
            <HStack spacing={5} >
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onSelectPlatform={(platform) => {
                  setGameQuery({ ...gameQuery, platform });
                }}
              />
              <SortSelector sortOrder={gameQuery.sortOrder} onSelectSortOrder={(sortOrder)=>setGameQuery({...gameQuery,sortOrder})}/>
            </HStack>
          </Box>
          <GameGrid
            // selectedPlatform={selectedPlatform}
            // selectedGenre={ selectedGenre}
            gameQuery={gameQuery}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
