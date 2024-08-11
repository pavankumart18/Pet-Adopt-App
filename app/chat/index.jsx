import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../../config/FireBaseConfig';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-react';
import { useNavigation } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen() {
    const params = useLocalSearchParams();
    const { user } = useUser();
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getUserDetails();

        const unsubscribe = onSnapshot(collection(db, 'Chats', params?.id, 'Messages'), (querySnapshot) => {
            const messages = querySnapshot.docs.map(doc => {
                const firebaseData = doc.data();
                const data = {
                    _id: doc.id,
                    text: firebaseData.text,
                    createdAt: new Date(firebaseData.createdAt.seconds * 1000), // Convert Firebase timestamp to JavaScript Date
                    user: firebaseData.user
                };
                return data;
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [params?.id]);

    const getUserDetails = async () => {
        const docRef = doc(db, 'Chats', params.id);
        const docSnap = await getDoc(docRef);

        const result = docSnap.data();
        const otherUser = result?.users.find(item => item.email !== user?.primaryEmailAddress?.emailAddress);
        
        navigation.setOptions({
            headerTitle: otherUser?.username || 'Chat',
        });
    };

    const onSend = async (messages = []) => {
        const message = messages[0];
        setMessages(previousMessages => GiftedChat.append(previousMessages, message));

        await addDoc(collection(db, 'Chats', params.id, 'Messages'), {
            ...message,
            createdAt: new Date()
        });
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            showUserAvatar={true}
            user={{
                _id: user?.primaryEmailAddress?.emailAddress,
                username: user?.fullName,
                avatar: user?.imageUrl
            }}
        />
    );
}
