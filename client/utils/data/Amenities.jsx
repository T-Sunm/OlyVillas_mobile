import PoolTable from "../../assets/svg/ameneties/PoolTable";
import Ac from "../../assets/svg/ameneties/ac";
import Bbq from "../../assets/svg/ameneties/bbq";
import Beach from "../../assets/svg/ameneties/beach";
import CarbonMonoxideAlarm from "../../assets/svg/ameneties/carbon-monoxide-alarm";
import FireExt from "../../assets/svg/ameneties/fire-ext";
import FirePit from "../../assets/svg/ameneties/fire-pit";
import FirstAid from "../../assets/svg/ameneties/first-aid";
import Gym from "../../assets/svg/ameneties/gym";
import HotTub from "../../assets/svg/ameneties/hot-tub";
import IndoorFirplace from "../../assets/svg/ameneties/indoor-firplace";
import Kitchen from "../../assets/svg/ameneties/kitchen";
import Lake from "../../assets/svg/ameneties/lake";
import OutdoorDining from "../../assets/svg/ameneties/outdoor-dining";
import OutdoorShower from "../../assets/svg/ameneties/outdoor-shower";
import PaidParking from "../../assets/svg/ameneties/paid-parking";
import Parking from "../../assets/svg/ameneties/parking";
import Patio from "../../assets/svg/ameneties/patio";
import Piano from "../../assets/svg/ameneties/piano";
import Pool from "../../assets/svg/ameneties/pool";
import Ski from "../../assets/svg/ameneties/ski";
import SmokeAlarm from "../../assets/svg/ameneties/smoke-alarm";
import Tv from "../../assets/svg/ameneties/tv";
import WashingMachine from "../../assets/svg/ameneties/washing-machine";
import Wifi from "../../assets/svg/ameneties/wifi";
import Workplace from "../../assets/svg/ameneties/workplace";

export const AmenetiesType = [
  {
    type: "basic",
    data: [
      { name: "Wifi", svgPath: <Wifi width="40" height="40"/>, group: "InternetandOffice" },
      { name: "TV", svgPath: <Tv width="40" height="40"/>, group: "Entertainment" },
      { name: "Kitchen", svgPath: <Kitchen width="40" height="40"/>, group: "KitchenandDining" },
      { name: "Washing Machine", svgPath: <WashingMachine width="40" height="40"/>, group: "BedroomandLaundry" },
      { name: "Free parking on premises", svgPath: <Parking width="40" height="40"/>, group: "ParkingandFacilities" },
      { name: "Paid parking on premises", svgPath: <PaidParking width="40" height="40"/>, group: "ParkingandFacilities" },
      { name: "Air conditioning", svgPath: <Ac width="40" height="40"/>, group: "HeatingandCooling" },
      { name: "Dedicated workspace", svgPath: <Workplace width="40" height="40"/>, group: "InternetandOffice" },
    ],
  },
  {
    type: "advanced",
    data: [
      { name: "Pool", svgPath: <Pool width="40" height="40"/>, group: "ParkingandFacilities" },
      { name: "Hot tub", svgPath: <HotTub width="40" height="40"/>, group: "ParkingandFacilities" },
      { name: "Patio", svgPath: <Patio width="40" height="40"/>, group: "Outdoor" },
      { name: "BBQ grill", svgPath: <Bbq width="40" height="40"/>, group: "Outdoor" },
      { name: "Outdoor dining area", svgPath: <OutdoorDining width="40" height="40"/>, group: "Outdoor" },
      { name: "Fire pit", svgPath: <FirePit width="40" height="40"/>, group: "Outdoor" },
      { name: "Pool table", svgPath: <PoolTable width="40" height="40"/>, group: "Entertainment" },
      { name: "Indoor fireplace", svgPath: <IndoorFirplace width="40" height="40"/>, group: "HeatingandCooling" },
      { name: "Piano", svgPath: <Piano width="40" height="40"/>, group: "Entertainment" },
      { name: "Exercise equipment", svgPath: <Gym width="40" height="40"/>, group: "ParkingandFacilities" },
      { name: "Lake access", svgPath: <Lake width="40" height="40"/>, group: "LocationFeatures" },
      { name: "Beach access", svgPath: <Beach width="40" height="40"/>, group: "LocationFeatures" },
      { name: "Ski-in/Ski-out", svgPath: <Ski width="40" height="40"/>, group: "LocationFeatures" },
      { name: "Outdoor shower", svgPath: <OutdoorShower width="40" height="40"/>, group: "Bathroom" },
    ],
  },
  {
    type: "safety",
    data: [
      { name: "Smoke alarm", svgPath: <SmokeAlarm width="40" height="40"/>, group: "HomeSafety" },
      { name: "First aid kit", svgPath: <FirstAid width="40" height="40"/>, group: "HomeSafety" },
      { name: "Fire extinguisher", svgPath: <FireExt width="40" height="40"/>, group: "HomeSafety" },
      { name: "Carbon monoxide alarm", svgPath: <CarbonMonoxideAlarm width="40" height="40"/>, group: "HomeSafety" },
    ],
  },
];
