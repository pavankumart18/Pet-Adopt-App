import { View, Text,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Category from './Category'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/FireBaseConfig';
import { query, where } from 'firebase/firestore';
import PetListItem from './Petlistitem';
export default function PetlistbyCategory() {
  const [petList, setPetList] = React.useState([]);
  useEffect(() => {
    GetPetList('Dogs');
  }  , []);
  const [loader, setLoader] = React.useState(false);
  /**
   * Fetch the pet list by category
   * @param {*} category 
   */
  const GetPetList = async (category) => {
    try {
      // Fetch the slider data from the server
      setLoader(true);
      setPetList([]);
      const q = query(collection(db, 'Pets'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // Collect the slider data

        setPetList(petList=>[...petList,doc.data()]);
      });
      setLoader(false);

    } catch (error) {
      console.error('Error fetching slider data:', error);
    }
  }
  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/>
      <FlatList
        data={petList}
        horizontal={true}
        style={{
          marginTop: 20,
        }}
        refreshing={loader}
        onRefresh={()=>GetPetList('Dogs')}
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        renderItem={({ item }) => (
          <PetListItem pet={item} />
        )}
      />
    </View>
  )
}