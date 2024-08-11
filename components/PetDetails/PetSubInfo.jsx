import { View, Text,Image } from 'react-native'
import React from 'react'

export default function PetSubInfo({pet}) {
  return (
    <View
        style={{
            padding: 20,
        }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
            gap: 10,
        }}
      >
        <View
            style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                flex:1,
                backgroundColor: '#fff',
                borderRadius: 10,
                justifyContent: 'center',
                gap: 20,

            }}
        >
            <Image source={require('../../assets/images/sex.png')} style={{ 
                width: 40, 
                height: 40,
                objectFit: 'cover',
                }} />
            <View>
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        marginTop: 10,
                    }}
                >Sex</Text>
                <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: '#666',
                    }}
                >{pet?.sex}</Text>


            </View>
        </View>
        <View
            style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                flex:1,
                backgroundColor: '#fff',
                borderRadius: 10,
                gap: 20,
                justifyContent: 'center',
            }}
        >
            <Image source={require('../../assets/images/breed.png')} style={{ 
                width: 40, 
                height: 40,
                objectFit: 'cover',
                }} />
            <View>
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        marginTop: 10,
                    }}
                >Breed</Text>
                <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: '#666',
                    }}
                >{pet?.breed}</Text>
            </View>
            </View>

      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap:10,
          marginTop: 10,
        }}
      >
        <View
            style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                flex:1,
                backgroundColor: '#fff',
                borderRadius: 10,
                justifyContent: 'center',
                gap: 20,

            }}
        >
            <Image source={require('../../assets/images/calendar.png')} style={{ 
                width: 40, 
                height: 40,
                objectFit: 'cover',
                }} />
            <View>
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        marginTop: 10,
                    }}
                >Age</Text>
                <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: '#666',
                    }}
                >{pet?.age}</Text>


            </View>
        </View>
        <View
            style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                flex:1,
                backgroundColor: '#fff',
                borderRadius: 10,
                gap: 20,
                justifyContent: 'center',
            }}
        >
            <Image source={require('../../assets/images/weight.png')} style={{ 
                width: 40, 
                height: 40,
                objectFit: 'cover',
                }} />
            <View>
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        marginTop: 10,
                    }}
                >Weight</Text>
                <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: '#666',
                    }}
                >{pet?.weight}</Text>
            </View>
            </View>

      </View>
    </View>
  )
}