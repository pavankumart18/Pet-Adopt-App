import { View, Text, Image } from 'react-native'
import React from 'react'
import MarkFavourite from '../MarkFavourite'
export default function PetInfo({pet}) {
  return (
    <View>
      <Image source={{uri:pet?.imageUrl}} style={{
        width: '100%',
        height: 400,
        objectFit: 'cover',
      }} />
      <View
        style={{
          padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

        }}

      >
        <View>
        <Text
            style={{
                fontFamily: 'outfit-bold',
                fontSize: 24,
                marginTop: 10,
            }}
        >
            {pet?.name}
        </Text>
        <Text
            style={{
                fontFamily: 'outfit',
                fontSize: 16,
                color: '#666',
            }}
        >
            {pet?.address}
        </Text>
        </View>
            <MarkFavourite pet={pet}/>

      </View>

    </View>
  )
}