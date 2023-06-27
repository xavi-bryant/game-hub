import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react"
import { Game } from "../hooks/useGames"
import PlatformIconList from "./PlatformIconList"
import CriticScore from "./CriticScore"
import getCroppedImageUrl from "../image-url"
import Emoji from "./Emoji"

interface Props{
    game: Game
}

const GameCard = ({game}:Props) => {
  return (
    <Card cursor='pointer' >
        <Image src={getCroppedImageUrl(game.background_image)} />
        <CardBody>
            <HStack py='2px' justifyContent="space-between" mb={3}>
            <PlatformIconList  platforms={game.parent_platforms.map(p=>p.platform)} />
            <CriticScore  score={game.metacritic} />
            </HStack>
            <Heading fontSize="xl">{game.name}
            <Emoji  rating_top={game.rating_top}/>
            </Heading>
        </CardBody>
    </Card>
  )
}

export default GameCard
