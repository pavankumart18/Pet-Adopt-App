import { View, Text, FlatList, ActivityIndicator, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';
import { useUser } from '@clerk/clerk-react';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';

export default function Inbox() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatList, setChatList] = useState([]);

  const GetUserList = async () => {
    try {
      const q = query(collection(db, 'Chats'), where('userId', 'array-contains', user?.primaryEmailAddress?.emailAddress));
      const querySnapshot = await getDocs(q);
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() });
      });
      setChatList(chats);
    } catch (err) {
      console.error('Error fetching chats:', err);
      setError('Error fetching chats');
    } finally {
      setLoading(false);
    }
  };

  const MapOtherUser = () => {
    return chatList.map((chat) => {
      const otherUser = chat.users.find((u) => u.email !== user?.primaryEmailAddress?.emailAddress);
      return {
        id: chat.id,
        user: otherUser,
      };
    });
  };

  useEffect(() => {
    GetUserList();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View
      style={{
        margin: 20,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'outfit-bold'
        }}
      >Inbox</Text>
      <FlatList
        data={MapOtherUser()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
              gap: 10,
              padding: 20,
              backgroundColor: '#f9f9f9',
              borderRadius: 99,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Image source={{ uri: item?.user?.imageUrl }} style={{ 
                width: 50, 
                height: 50,
                borderRadius: 50,
              }} />
              <Text>{item?.user?.username}</Text>
            </View>
            <Link
              href={`/chat?id=${item.id}`}
              style={{
                backgroundColor: 'orange',
                padding: 10,
                borderRadius: 99,
              }}
            >
              <Feather name="send" size={24} color="black" />
            </Link>
          </View>
        )}
      />
    </View>
  );
}
