import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import {  BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";
import { Platform } from "../hooks/useGames";

interface Props {
    onSelectPlatform: (platform: Platform) => void;
    selectedPlatform: Platform | null;
}

const PlatformSelector = ({onSelectPlatform,selectedPlatform}:Props) => {
   const {data,error} = usePlatform()
//    如果data是空的 return 'there are have on game for this platform'
    // if(data.length===0) return 'there are have on game for this platform'
    if(error) return null    

    

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown/>}>{selectedPlatform ? selectedPlatform?.name :'Platform'}</MenuButton>
      <MenuList >
        {data.map(platfrom=><MenuItem onClick={()=>onSelectPlatform(platfrom)} key={platfrom.id}>{platfrom.name }</MenuItem>)}
         
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
