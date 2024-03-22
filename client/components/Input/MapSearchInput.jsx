import React, {useEffect, useState} from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'
import axios from 'axios'
import { MAP_KEY } from '../../environment';
import { FONTFAMILY, COLORS } from '../../theme/theme';

function MapSearchInput({styles, onSetLocation}) {

    const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

async function getLocationDetail(id){
    const response = await axios.get(`https://rsapi.goong.io/Place/Detail?api_key=${MAP_KEY}&place_id=${id}`)
    return response.data.result
}

  useEffect(() => {
    if (searchTerm !== "") {
      const delayDebounceFn = setTimeout(() => {
        axios
          .get(`https://rsapi.goong.io/Place/AutoComplete?api_key=${MAP_KEY}&input=${encodeURIComponent(searchTerm)}`)
          .then((response) => {
            setSearchResults(response.data.predictions);
          });
      }, 2000);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([])
    }
  }, [searchTerm]);

  return (
    <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Search for location" onChangeText={text => setSearchTerm(text)}/>

        {searchResults.length > 0 && searchResults.map((result, index) => (
            <Pressable key={index} 
            style={{
              padding: 4,
              borderBottomWidth: searchResults.lastIndexOf(result) === searchResults.length - 1 ? 0 : 1,
              borderBottomColor: COLORS.Grey,
              backgroundColor: COLORS.White,
            }} 
            onPress={async () => {
                setSearchTerm('')
                setSearchResults([])
                const placeResult = await getLocationDetail(result.place_id)
                onSetLocation({
                    address: placeResult.formatted_address,
                    coord: {
                        lat: placeResult.geometry.location.lat,
                        lng: placeResult.geometry.location.lng
                    }
                })
            }}>
                <View>
                    <Text style={{
                      fontFamily: FONTFAMILY.poppins_medium,
                      fontSize: 12
                    }}>{result.description}</Text>
                </View>
            </Pressable>
        ))}
    </View>
  )
}

export default MapSearchInput