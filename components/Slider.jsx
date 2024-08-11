import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/FireBaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = React.useState([]);

  const GetSlider = async () => {
    try {
      // Fetch the slider data from the server
      const querySnapshot = await getDocs(collection(db, 'Sliders'));
      const sliders = [];

      querySnapshot.forEach((doc) => {
        // Collect the slider data
        sliders.push(doc.data());
      });

      // Update state with the collected data
      setSliderList(sliders);
    } catch (error) {
      console.error('Error fetching slider data:', error);
    }
  };

  useEffect(() => {
    GetSlider();
  }, []);

  return (
    <View
        style={{
            marginTop: 20,
        }}
    >
      <FlatList
        data={sliderList}
        horizontal={true} // Horizontal view
        showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        renderItem={({ item }) => (
          <View style={{ marginRight: 20 }}>
            <Image
              source={{ uri: item?.imageUrl }}
              style={{ width: Dimensions.get("screen").width*0.9, height: 180, borderRadius: 20

               }}
            />
          </View>
        )}
      />
    </View>
  );
}
