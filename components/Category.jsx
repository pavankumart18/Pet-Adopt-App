import { View, Text,FlatList,Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/FireBaseConfig';

export default function Category({category}) {

    const [categoryList, setCategoryList] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState('Dogs');

    const GetCategories = async () => {
        try {
            // Fetch the slider data from the server
            const querySnapshot = await getDocs(collection(db, 'Category'));
            const categories = []; 
      
            querySnapshot.forEach((doc) => {
              // Collect the slider data
              categories.push(doc.data());
            });
      
            // Update state with the collected data
            setCategoryList(categories);
          } catch (error) {
            console.error('Error fetching slider data:', error);
          }
    }
    useEffect(() => {
        GetCategories();
    }   , []);
  return (
    <View
        style={{
            marginTop: 20,

        }}
    >
      <Text
        style={{
            fontSize: 24,
            fontFamily: 'outfit-bold'
        }}
      >Category</Text>
      <View
        style={{
            marginTop: 10,
        }}
      >
      <FlatList
        data={categoryList}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        renderItem={({ item }) => (
            <TouchableOpacity
                onPress={() => {
                  setSelectedCategory(item?.name);
                  category(item?.name);
                }}
                style={{
                    flex:1,
                }}
            >
          <View
            style={[{
              backgroundColor:'#FFEF00',
              padding:15,
              alignItems:'center',
                borderWidth:1,
                borderRadius:20,
                borderColor:'#FFEF00',
                margin:5
            },
            selectedCategory === item?.name && {backgroundColor:'white',borderColor:'#000',borderWidth:1}
            ]}
          >
            <Image
              source={{ uri: item?.imageUrl }}
              style={{ width: 60, height: 60, borderRadius: 20,
              }}
            />
          </View>
          <Text
            style={{
              textAlign:'center',
              fontFamily: 'outfit-bold',
              fontSize: 16,
            }}
          >{item?.name}</Text>
          </TouchableOpacity>
        )}
        />
        </View>
    </View>
  )
}