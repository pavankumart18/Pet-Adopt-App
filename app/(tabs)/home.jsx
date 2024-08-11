import { View, Text,ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Slider from '../../components/Slider'
import PetlistbyCategory from '../../components/PetlistbyCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router'
export default function Home() {
  return (

    <View
      style={{
        padding:20,
        marginTop:20,
      }}
    >
      
        {/* Header */}
        <Header />


        {/* slider */}
        <Slider />

        {/* Categories */}
        <PetlistbyCategory />

        {/* List of Pets  */}


        {/* Add new pet button */}
        <Link
          href='/add-pet'
          style={{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            marginTop:20,
            padding:10,
            textAlign:'center',
            backgroundColor:'#fff',
            borderRadius:10,
            elevation:5,
          }}
        >
          <MaterialIcons name="pets" size={30} color="black" />
          <Text>Add New Pet</Text>

        </Link>

    </View>
  )
}