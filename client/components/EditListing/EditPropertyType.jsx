import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    ScrollView,
    Image,
    TextInput,
  } from "react-native";
  import { FONTFAMILY } from "../../theme/theme";
  import React, { useState } from "react";
  import { FontAwesome6 } from "@expo/vector-icons";
  import { Dropdown } from "react-native-element-dropdown";
  import { places, ListingType, PropertyType } from "../../utils/EditPropertyType";
  
  const EditPropertyType = ({ modalVisible, setModalVisible, locationType, placeType, setLocationType, setPlaceType}) => {
      const [isFocus, setIsFocus] = useState(false);
      
      const [propertyType, setPropertyType] = useState(locationType.name)
      const [listingType, setListingType] = useState(ListingType.find((item) => item.id === placeType.id).name)
      const [placeOptions, setPlaceOptions] = useState(places.find((item) => item.id === locationType.parentId).name)

    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.ModalContainer}>
          <View style={styles.ModalHeader}>
            <Pressable
              style={{ position: "absolute", top: 4, left: 20, padding: 5 }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome6 name="chevron-left" size={20} color="black" />
            </Pressable>
            <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 20 }}>
              Property Type
            </Text>
          </View>
          <View style={styles.container}>
                <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 14 }}>
                    Which is the most like yout place?
                </Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#dddddd' }]}
                    placeholderStyle={styles.placeholderStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={300}
                    labelField={"name"}
                    valueField={"name"}
                    value={placeOptions}
                    data={places}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(value) => {
                        setPlaceOptions(value.name);
                    }
                    }
                />
                <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 14 }}>
                    Property Type
                </Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#dddddd' }]}
                    placeholderStyle={styles.placeholderStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={300}
                    labelField={"name"}
                    valueField={"name"}
                    value={propertyType}
                    data={PropertyType.filter((item) => item.parentId === places.find((item2) => item2.name === placeOptions).id)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(value) => {
                        setPropertyType(value.name);
                        setLocationType({name: value.name, parentId: places.find((item) => item.name === placeOptions).id})
                    }
                    }
                />
                <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 14 }}>
                    Listing Type
                </Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#dddddd' }]}
                    placeholderStyle={styles.placeholderStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={300}
                    labelField={"name"}
                    valueField={"name"}
                    value={listingType}
                    data={ListingType.filter((item) => item.parentId.includes(places.find((item2) => item2.name === placeOptions).id))}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(value) => {
                        setListingType(value.name);
                        setPlaceType({type: value.data, id: ListingType.find((item) => item.data === value.data).id})
                    }
                    }
                />
          </View>
        </View>
      </Modal>
    );
  };
  
  export default EditPropertyType;
  
  const styles = StyleSheet.create({
    ModalContainer: {
      flex: 1,
      backgroundColor: "#fdffff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopColor: "rgba(80, 80, 80, 0.7)",
      borderWidth: 1,
    },
    ModalHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      position: "relative",
      marginTop: 20,
    },
    container: {
      // flex: 1,
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
        marginTop: 60,
      //   marginBottom: 70,
      paddingHorizontal: 20,
    },
    button: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      // position: 'absolute',
      // left: 5,
      // top: -5,
      // zIndex: 10,  // Ensure the button is above the image
      opacity: 0.8,
    },
    input: {
      // borderColor: "#dddddd",
      // borderWidth: 2,
      marginTop: 20,
      borderRadius: 10,
      padding: 10,
      textAlignVertical: "top",
      fontSize: 24,
      fontFamily: FONTFAMILY.poppins_semibold,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
  });
  