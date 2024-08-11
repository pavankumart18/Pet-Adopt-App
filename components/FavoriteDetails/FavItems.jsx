import { View, Text ,Image} from 'react-native'
import React, { useEffect } from 'react'

export default function FavItems({pet}) {
  return (
    <View
        style={{
            margin: 10,
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 5,
        }}
    >
        <Image source={{uri:pet?.imageUrl}} style={{ 
        width: 150, 
        height: 135,
        borderRadius: 10,
        objectFit: 'cover',
        }} />
        <Text
            style={{
                fontFamily: 'outfit-bold',
                fontSize: 16,
                marginTop: 10,
            }}
        >
            {pet?.name}
        </Text>
    </View>
  )
}