import { View, Text,FlatList } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import {GetFavourite}  from '../../Shared/Shared'
import { db } from '../../config/FireBaseConfig'
import { collection, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { getDocs } from 'firebase/firestore'
import FavItems from '../../components/FavoriteDetails/FavItems'
import PetListItem from '../../components/Petlistitem'
export default function Favorite() {
  const { user } = useUser()
  const [favIds, setFavIds] = React.useState([])
  const [loader, setLoader] = React.useState(true)

  //Fav ids
  const GetFavIds = async () => {
    try {
      //Get fav ids
      setLoader(true)
      const result=await GetFavourite(user);
      console.log(result)
      setFavIds(result?.favourites || [])
      setLoader(false)
      if(favIds.length>0){
        fetchData()
      }
    } catch (error) {
      console.error("Failed to fetch favourites:", error)
    }
  }

  const [favs, setFavs] = React.useState([])
  //Fetch favs
  React.useEffect(() => {
    user&&GetFavIds()
  }, []) 
  const fetchData = async () => {
    try {
      //Fetch favs
      //Update the state with the retrieved favorites
      setLoader(true)
      const q=query(collection(db, "Pets"), where("id", "in", favIds))
      const querySnapshot = await getDocs(q)
      const fav = []
      querySnapshot.forEach((doc) => {
        fav.push(doc.data())
      }) 
      setFavs(fav)
      setLoader(false)
    } catch (error) {
      console.error("Failed to fetch favourites:", error)
    }
  }
  return (
    <View
      style={{
        paddingTop: 30,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontFamily: 'outfit-bold',
          marginTop: 20,
          padding: 20,
        }}
      >Favorites</Text>
      <View>
        <FlatList
          data={favs}
          numColumns={2}
          onRefresh={GetFavIds}
          refreshing={loader}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PetListItem pet={item} />
          )}
        />
      </View>
    </View>
  )
}