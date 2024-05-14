import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";
import TabNavigators from "./TabNavigators";
import Login from "../screens/Login";
import { FONTFAMILY } from "../theme/theme";
import Booking from "../screens/Booking";

import ModalHeaderText from "../components/ModalHeaderText";
import ListingDetails from "../screens/ListingScreen/ListingDetails";
import ListingAmenitiesDetails from "../screens/ListingScreen/ListingAmenitiesDetails";
import ReserveScreen from "../screens/ReserveScreen/ReserveScreen";
import PhoneScreen from "../screens/ReserveScreen/PhoneScreen";
import Register from "../screens/Register";
import { useClerk } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import useReserveStore from "../store/reserveStore";
import TripsDetails from "../screens/Trips/TripsDetails";
import ListSpace from "../screens/ListSpace/ListSpace";
import Host from "../screens/HostScreen/Host";
import Step1 from "../screens/HostScreen/HostSteps/Step1";
import SelectLocationType from "../screens/HostScreen/HostSteps/SelectLocationType";
import SelectPlaceType from "../screens/HostScreen/HostSteps/SelectPlaceType";
import SelectMapData from "../screens/HostScreen/HostSteps/SelectMapData";
import ConfirmLocation from "../screens/HostScreen/HostSteps/ConfirmLocation";
import RoomNumber from "../screens/HostScreen/HostSteps/RoomNumber";
import Step2 from "../screens/HostScreen/HostSteps/Step2";
import SelectAmetities from "../screens/HostScreen/HostSteps/SelectAmetities";
import AddPhotos from "../screens/HostScreen/HostSteps/AddPhotos"
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const navigation = useNavigation();
  const { signOut } = useClerk();
  const { setRangeDate, setGuests, setName, setEmail, setPhone, setPrice } =
    useReserveStore();

  const handleGobackSignOut = () => {
    signOut();
    navigation.goBack();
  };

  const handleGoBackBookings = () => {
    setRangeDate({ startDate: new Date(), endDate: new Date() });
    setGuests({ Adults: 1, Children: 1, Infants: 1 });
    setName("");
    setEmail("");
    setPhone("normal", "");
    setPhone("formatted", "");
    setPrice(null);
    navigation.goBack();
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tab"
        component={TabNavigators}
        options={{ animation: "default", headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={({ navigation }) => ({
          animation: "slide_from_bottom",
          title: "Log in or sign up",
          presentation: "modal",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: FONTFAMILY.poppins_semibold,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={({ navigation }) => ({
          animation: "slide_from_bottom",
          title: "Complete registration",
          presentation: "modal",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: FONTFAMILY.poppins_semibold,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleGobackSignOut}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="bookings"
        component={Booking}
        options={({ navigation }) => ({
          animation: "fade",
          presentation: "transparentModal",
          headerTransparent: true,
          header: () => <ModalHeaderText navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ListingAmenitiesDetails"
        component={ListingAmenitiesDetails}
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="PhoneScreen"
        component={PhoneScreen}
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="listingdetails"
        component={ListingDetails}
        options={{
          animation: "slide_from_right",
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ReserveScreen"
        component={ReserveScreen}
        options={({ navigation }) => ({
          headerTitle: "Confirm and pay",
          headerTitleAlign: "center",
          animation: "slide_from_right",
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBackBookings}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TripsDetails"
        component={TripsDetails}
        options={{ headerTitle: "Trips details" }}
      />
      <Stack.Screen
        name="ListSpace"
        component={ListSpace}
        options={{
          animation: "slide_from_right",
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="BecomeHost"
        component={Host}
        options={{
          animation: "slide_from_right",
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                borderColor: "rgba(80, 80, 80, .5)",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 20,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text>Exit</Text>
            </TouchableOpacity> 
          ),
        }}
      />
      <Stack.Screen
      name="Step1"
      component={Step1}
      options={{
        animation: "slide_from_right",
        headerTitle: "",
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderColor: "rgba(80, 80, 80, .5)",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 20,
            }}
            onPress={() => navigation.navigate('profile')}
          >
            <Text>Exit</Text>
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen
    name="SelectLocationType"
    component={SelectLocationType}
    options={{
      animation: "slide_from_right",
      headerTitle: "",
      headerBackground: () => (
        <View style={{ backgroundColor: "#FDFFFF" }} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(80, 80, 80, .5)",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Exit</Text>
        </TouchableOpacity>
      ),
    }}
  />
    <Stack.Screen
    name="SelectPlaceType"
    component={SelectPlaceType}
    options={{
      animation: "slide_from_right",
      headerTitle: "",
      headerBackground: () => (
        <View style={{ backgroundColor: "#FDFFFF" }} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(80, 80, 80, .5)",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Exit</Text>
        </TouchableOpacity>
      ),
    }}
  />
     <Stack.Screen
    name="SelectMapData"
    component={SelectMapData}
    options={{
      animation: "slide_from_right",
      headerTitle: "",
      headerBackground: () => (
        <View style={{ backgroundColor: "#FDFFFF" }} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(80, 80, 80, .5)",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Exit</Text>
        </TouchableOpacity>
      ),
    }}
  />
   <Stack.Screen
    name="ConfirmLocation"
    component={ConfirmLocation}
    options={{
      animation: "slide_from_right",
      headerTitle: "",
      headerBackground: () => (
        <View style={{ backgroundColor: "#FDFFFF" }} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(80, 80, 80, .5)",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Exit</Text>
        </TouchableOpacity>
      ),
    }}
  />
   <Stack.Screen
    name="RoomNumber"
    component={RoomNumber}
    options={{
      animation: "slide_from_right",
      headerTitle: "",
      headerBackground: () => (
        <View style={{ backgroundColor: "#FDFFFF" }} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(80, 80, 80, .5)",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Exit</Text>
        </TouchableOpacity>
      ),
    }}
  />
   <Stack.Screen
    name="Step2"
    component={Step2}
    options={{
      animation: "slide_from_right",
      headerTitle: "",
      headerBackground: () => (
        <View style={{ backgroundColor: "#FDFFFF" }} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(80, 80, 80, .5)",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Exit</Text>
        </TouchableOpacity>
      ),
    }}
  />
   <Stack.Screen
    name="SelectAmetities"
    component={SelectAmetities}
    options={{
      animation: "slide_from_right",
      headerTitle: "",
      headerBackground: () => (
        <View style={{ backgroundColor: "#FDFFFF" }} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(80, 80, 80, .5)",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Exit</Text>
        </TouchableOpacity>
      ),
    }}
  />
   <Stack.Screen
    name="AddPhotos"
    component={AddPhotos}
    options={{
      animation: "slide_from_right",
      headerTitle: "",
      headerBackground: () => (
        <View style={{ backgroundColor: "#FDFFFF" }} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(80, 80, 80, .5)",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Exit</Text>
        </TouchableOpacity>
      ),
    }}
  />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
