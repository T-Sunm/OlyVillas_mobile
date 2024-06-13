import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import HostBottomBar from '../../../components/HostComponents/HostBottomBar'
import { FONTFAMILY } from '../../../theme/theme'

const Step1 = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../../../assets/image/step1.gif')} style={styles.img}/>
      </View>
      <View>
        <Text style={styles.stepText}>Step 1</Text>
        <Text style={styles.titleText}>Tell us about your place</Text>
        <Text style={styles.descriptionText}>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</Text>
      </View>
      <HostBottomBar navigationTarget={'SelectLocationType'} isDisable={false}/>
    </View>
  )
}

export default Step1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 160,
        paddingHorizontal: 20,
        backgroundColor: '#FDFFFF',
        flexDirection: 'column',
    },
    imgContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 320,
        height: 320,
    },
      stepText: {
        fontFamily: FONTFAMILY.poppins_medium,
        marginBottom: 10,
      },
      titleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 20,
        marginBottom: 10,
      },
      descriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 15,
        lineHeight: 25,
        color: '#222222'
      }
})