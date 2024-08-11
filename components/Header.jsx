import { View, Text,Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function Header() {

    const {user} = useUser();

  return (
    <View
        style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        }}
    >
        <View>
            <Text
                style={{
                fontSize: 24,
                fontFamily: 'outfit-bold'
                }}
            >
                Welcome
            </Text>
            <Text
                style={{
                fontSize: 30,
                fontFamily: 'outfit-bold',
                color: 'gray',
                }}
            >
                {user?.fullName}
            </Text>
        </View>
        <Image source={{uri: user?.imageUrl}} style={{
            width: 60, height: 60, borderRadius: 99, marginLeft: 'auto'
            }} />
    </View>
  )
}