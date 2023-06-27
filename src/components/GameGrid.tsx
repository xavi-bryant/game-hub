
import { SimpleGrid, Text } from "@chakra-ui/react";
import  useGames  from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "../hooks/useGenres";
interface Props {
  selectedGenre: Genre | null
} 

const GameGrid = ({selectedGenre}:Props) => {
   const {data, error ,loading} = useGames(selectedGenre)
   const skeletons = [...Array(50).keys()]
   

  return (
    <>
      {error ? (
        <Text>{error}</Text>
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
