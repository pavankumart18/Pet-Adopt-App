import { View, Text, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import MarkFavourite from './MarkFavourite';
export default function PetListItem({pet}) {
    const router = useRouter();
  return (
    <TouchableOpacity
        onPress={()=>(
            console.log("Pressed"),
            
            router.push({
            pathname: '/pet-details',
            params: pet ,
        }
    
    ))}
        style={{
            margin: 10,
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 5,
        }}
    >
        <View
            style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 100,
            }}
        >
            <MarkFavourite pet={pet} />
        </View>
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
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Text
                style={{
                    fontFamily: 'outfit',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 5,
                }}
            >
                {pet?.breed}
            </Text>
            <Text
                style={{
                    fontFamily: 'outfit',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 5,
                    padding: 5,
                    backgroundColor: '#FFEF00',
                }}
            >
                {pet?.age} YRS
            </Text>
        </View>
    </TouchableOpacity>
  )
}