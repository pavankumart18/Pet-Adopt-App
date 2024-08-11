import { View, Text ,Image} from 'react-native'
import React, { useEffect } from 'react'
import Feather from '@expo/vector-icons/Feather';
export default function Owner({pet}) {
  return (
    <View
        style={{
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 20,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 5,
            borderWidth: 1,
        }}
    >
        <View
            style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                flex:1,
                gap: 20,
            }}
        >
        <Image source={{uri: pet?.userImage}} style={{
            width: 50,
            height: 50,
            borderRadius: 50,
        }} />
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
        <Text
            style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                marginTop: 10,
            }}
        >{pet?.username}</Text>
        <Text
            style={{
                fontFamily: 'outfit',
                fontSize: 16,
                color: '#666',
            }}
        >Pet Owner</Text>
        </View>
        </View>
        <View
            style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                backgroundColor: '#fff',
                borderRadius: 99,
                justifyContent: 'center',
                gap: 20,
            }}
        >
            <Feather name="send" size={30} color="black" />
        </View>
    </View>
  )
}