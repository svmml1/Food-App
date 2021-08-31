import React,{ useState, useReducer, useEffect} from 'react'
import { View, Text, Image, Dimensions, StyleSheet, } from 'react-native'
import * as Location from 'expo-location'

import { useNavigation } from '../../utils/useNavigation'

const screenWidth = Dimensions.get('screen').width



export const LandingScreen = () => {

  const { navigate } = useNavigation()

  const [erroMsg, setErrorMsg] = useState("")
  const [address, setAddress] = useState<Location.Address>()
  
  const [displayAddress, setDisplayAddress] = useState("Waiting for Current Location")

  useEffect(() => {

    (async () => {
      let {status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location is not granted')
      }

      let location: any =  await Location.getCurrentPositionAsync({});

      const { coords } = location

      if(coords) {

        const { latitude, longitude} = coords;
        let addressResponse: any =  await Location.reverseGeocodeAsync({ latitude, longitude})

        for( let item of addressResponse){
          setAddress(item)
          let currentAddress = `${item.name},${item.street},${item.postalCode}, ${item.country}`
          setDisplayAddress(currentAddress)
          if(currentAddress.length > 0){
            setTimeout(() => {
              navigate('homeStack')
            }, 2000)
          }
          return;
        }
      }else {

      }
    })

  })


  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
      <Text>Navigation</Text>
      </View>
      <View style={styles.body}>
        <Image source={require('../../images/delivery_icon.png')} style={styles.deliveryIcon} />
        <View style={styles.addressContainer}>
        <Text> Seu endereço de entraga</Text>

        </View>
        <Text style={styles.addressText}>{displayAddress}</Text>
      </View>
      <View style={styles.footer}>
        
      </View>

    </View>
  )
}


const styles =  StyleSheet.create({
  container : {
      flex: 1,
     
  },

  navigation: {
    flex: 2,
   
  },

  body:{
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
   
  },

  deliveryIcon:{
    width: 120,
    height: 120
},
  footer: {
    flex: 1,
  
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addressTitle:{
    fontSize: 22,
    fontWeight: '700',
    color: '#7D7D7D'
},
addressText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#4F4F4F'
},
})