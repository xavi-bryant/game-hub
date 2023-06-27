import { HStack, List, ListItem ,Image, Spinner, Button} from "@chakra-ui/react";
import  useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../image-url";

interface Props{
    onSelectGenre:(genre:Genre)=>void
}


const GenreList = ({onSelectGenre}:Props) => {

  const { data ,loading,error} = useGenres();

  if(error) return null
  if(loading) return <Spinner/>
  return (
    
    <List >
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
            <HStack >
            <Image boxSize='32px' borderRadius={8} src={getCroppedImageUrl(genre.image_background)}/>
            <Button fontSize='lg'  whiteSpace='pre-line' variant='link' onClick={()=>onSelectGenre(genre)} >
                {genre.name}
            </Button>
            </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
