import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function AboutPet({pet}) {
  const [readMore, setReadMore] = React.useState(true);
  return (
    <View>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          padding: 20,
        }}
      >
        About {pet?.name}
      </Text>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
      <Text
        numberOfLines={readMore ? 3 : 20}
        style={{
          fontFamily: 'outfit',
          fontSize: 16,
        }}
      >{pet?.about}</Text>
      {readMore && (
        <Pressable
        onPress={() => setReadMore(false)}
        >
        <Text
          onPress={() => setReadMore(false)}
          style={{
            color: '#f00',
            fontFamily: 'outfit-bold',
            fontSize: 16,
          }}
        >
          Read More
        </Text>
        </Pressable>
      )}
    </View>
    </View>
  )
}