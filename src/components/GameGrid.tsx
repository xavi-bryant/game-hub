import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
// import { Genre } from "../hooks/useGenres";
// import { Platform } from "../hooks/usePlatform";
interface Props {
  gameQuery: GameQuery | null;
  // selectedGenre: Genre | null;
  // selectedPlatform: Platform | null;
  // selectedSortOrder: string;
  
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, loading } = useGames(gameQuery);
  const skeletons = [...Array(50).keys()];
  //  console.log(data);

  return (
    <>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          padding="10px"
          spacing={6}
        >
          {loading &&
            skeletons.map((skeleton) => (
              <GameCardContainer key={skeleton}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))}
          {data.length === 0 && (
            <Heading py="3rem">there is no game for this option!</Heading>
          )}
          {data.map((game) => (
            <GameCardContainer key={game.id}>
              {" "}
              <GameCard game={game} />
            </GameCardContainer>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default GameGrid;
