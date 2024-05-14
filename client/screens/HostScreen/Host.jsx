import { ScrollView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import { hostImg } from '../../utils/host'
import { FONTFAMILY, FONTSIZE } from '../../theme/theme'

const steps = [
  {navigationName: "Step1"},
  {navigationName: "Step2"},
]

const Host = () => {
  const navigation = useNavigation()
  // const currentScreenName = navigation.getState().routes[navigation.getState().index].name;

  // console.log("Current Screen Name:", currentScreenName);
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <Text style={styles.headingTitle}>It's easy to get started on Olyvilas</Text>
            <View style={styles.stepContainer}>
              {hostImg.map((item, index) => (
                <View key={index}
                style={{display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 40}}>
                    <View style={{marginRight: 10}}>
                      <Text style={{fontFamily: FONTFAMILY.poppins_medium, fontSize: 18}}>{index+1}</Text>
                    </View>
                    <View style={{width: '70%', marginRight: '50'}}>
                      <Text style={{fontFamily: FONTFAMILY.poppins_medium, fontSize: 18}}>{item.title}</Text>
                      <Text style={{color: '#6a6a6a', fontSize: 14}}>{item.description}</Text>
                    </View>
                    <View>
                      <Image source={{uri: item.uri}} style={{width:80, height:80, margin: 'auto'}}/>
                    </View>
                </View>
              ))}
            </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
          onPress={() => navigation.navigate('Step1')}
          style={{width: '100%', backgroundColor:'#e51d53', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 8}}>
            <Text style={{textAlign: 'center', color: 'white', fontFamily: FONTFAMILY.poppins_semibold}}>Get Started</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Host

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 130,
    backgroundColor: '#FDFFFF'
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 5,
    borderBlockColor: 'rgba(80, 80, 80, 0.3)',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  headingTitle: {
    fontSize: 34,
    fontFamily: FONTFAMILY.poppins_medium,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
})