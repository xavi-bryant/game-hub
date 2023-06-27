
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import  useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "../hooks/useGenres";
import { Platform } from "../hooks/usePlatform";
interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
} 

const GameGrid = ({selectedGenre,selectedPlatform}:Props) => {
   const {data, error ,loading} = useGames(selectedGenre,selectedPlatform)
   const skeletons = [...Array(50).keys()]
  //  console.log(data);
   

  return (
    <>
      {(error || data.length===0) ? (
        <Heading py='3rem'>there is no game for this option!</Heading>
      ) : (
        <SimpleGrid columns={{sm:1,md:2,lg:3,xl:4 }} padding="10px" spacing={3}>
          {loading && skeletons.map(skeleton=><GameCardContainer key={skeleton}><GameCardSkeleton /></GameCardContainer>)}
          {data.map((game) => (
           <GameCardContainer key={game.id}> <GameCard    game={game}/></GameCardContainer>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}; 

export default GameGrid;
