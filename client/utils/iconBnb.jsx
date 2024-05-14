import TinyHome from "../assets/svg/lisitngTypes/tiny-home.jsx";
import Barn from "../assets/svg/lisitngTypes/barn";
import BedBreakfast from "../assets/svg/lisitngTypes/bed-breakfast";
import Boat from "../assets/svg/lisitngTypes/boat";
import Cabin from "../assets/svg/lisitngTypes/cabin";
import Campervan from "../assets/svg/lisitngTypes/campervan";
import CasaParticular from "../assets/svg/lisitngTypes/casa-particular";
import Castle from "../assets/svg/lisitngTypes/castle";
import Cave from "../assets/svg/lisitngTypes/cave";
import Container from "../assets/svg/lisitngTypes/container";
import CycladicHome from "../assets/svg/lisitngTypes/cycladic-home";
import Dammuso from "../assets/svg/lisitngTypes/dammuso";
import Dome from "../assets/svg/lisitngTypes/dome";
import EarthHome from "../assets/svg/lisitngTypes/earth-home";
import Farm from "../assets/svg/lisitngTypes/farm";
import GuestHouse from "../assets/svg/lisitngTypes/guest-house";
import Hotel from "../assets/svg/lisitngTypes/hotel";
import Houseboat from "../assets/svg/lisitngTypes/houseboat";
import Kezhan from "../assets/svg/lisitngTypes/kezhan";
import Minsu from "../assets/svg/lisitngTypes/minsu";
import Riad from "../assets/svg/lisitngTypes/riad";
import Ryokan from "../assets/svg/lisitngTypes/ryokan";
import ShepherdHut from "../assets/svg/lisitngTypes/shepherd-hut";
import Tent from "../assets/svg/lisitngTypes/tent";
import Tower from "../assets/svg/lisitngTypes/tower";
import TreeHouse from "../assets/svg/lisitngTypes/tree-house";
import Trullo from "../assets/svg/lisitngTypes/trullo";
import Windmill from "../assets/svg/lisitngTypes/windmill";
import Yurt from "../assets/svg/lisitngTypes/yurt";
import House from "../assets/svg/lisitngTypes/house.jsx";
import Flat from "../assets/svg/lisitngTypes/flat.jsx";



export const iconBnbs = [
  {
    parentId: 2,
    name: "House",
    icon: <House width="40" height="40"/>
  },
  {
    parentId: 1,
    name: "Flat/apartment",
    icon: <Flat width="40" height="40"/>
  },
  {
    parentId: 4,
    name: "Barn",
    icon: <Barn width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Boat",
    icon: <Boat width="40" height="40"/>,
  },
  {
    parentId: 2,
    name: "Cabin",
    icon: <Cabin width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Camper/RV",
    icon: <Campervan width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Casa particular",
    icon: <CasaParticular width="40" height="40"/>,
  }
  ,
  {
    parentId: 4,
    name: "Castle",
    icon: <Castle width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Cave",
    icon: <Cave width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Container",
    icon: <Container width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Cycladic home",
    icon: <CycladicHome width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Dammuso",
    icon: <Dammuso width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Dome",
    icon: <Dome width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Earth home",
    icon: <EarthHome width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Farm",
    icon: <Farm width="40" height="40"/>,
  },
  {
    parentId: 3,
    name: "Guesthouse",
    icon: <GuestHouse width="40" height="40"/>,
  },
  {
    parentId: 5,
    name: "Hotel",
    icon: <Hotel width="40" height="40"/>,
  },
  {
    parentId: 2,
    name: "Houseboat",
    icon: <Houseboat width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Kezhan",
    icon: <Kezhan width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Minsu",
    icon: <Minsu width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Riad",
    icon: <Riad width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Ryokan",
    icon: <Ryokan width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Shepherd's hut",
    icon: <ShepherdHut width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Tent",
    icon: <Tent width="40" height="40"/>,
  },
  {
    parentId: 2,
    name: "Tiny homes",
    icon: <TinyHome width="40" height="40"/>,
  },
  {
    parentId: 4,
    name: "Tower",
    icon: <Tower width="40" height="40"/>
  },
  {
    parentId: 4,
    name: "Treehouse",
    icon: <TreeHouse width="40" height="40"/>
  },
  {
    parentId: 4,
    name: "Trullo",
    icon: <Trullo width="40" height="40"/>
  },
  {
    parentId: 4,
    name: "Windmill",
    icon: <Windmill width="40" height="40"/>
  },
  {
    parentId: 4,
    name: "Yurt",
    icon: <Yurt width="40" height="40"/>
  }

];

import Room from '../assets/svg/lisitngTypes/room.jsx';
import SharedRoom from '../assets/svg/lisitngTypes/shared-room.jsx';
export const ListingType = [
  {
      id:1,
      parentId: [1,2,3,4],
      name: "An entire place",
      description:"Guests have the whole place to themselves.",
      data:"Entire",
      icon: <House width="40" height="40" />
  },
  {
      id:2,
      parentId: [1,2,3,4,5],
      name: "Room",
      description:"Guests have their own room in a home, plus access to shared spaces.",
      data:"Private room",
      icon: <Room width="40" height="40" />
  },
  {
      id:3,
      parentId: [1,2,3,4,5],
      name:"Shared room",
      description: "Guests sleep in a room or common area that may be shared with you or others.",
      data:"Room",
      icon: <SharedRoom width="40" height="40" />
  }
]