import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import Owner from '../../components/PetDetails/Owner';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../../config/FireBaseConfig';
import { collection, getDocs, query, setDoc, where, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function PetDetails() {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);

    const InitiateChat = async () => {
        const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + pet?.email;
        const docId2 = pet?.email + '_' + user?.primaryEmailAddress?.emailAddress;

        const q = query(collection(db, 'Chats'), where('id', 'in', [docId1, docId2]));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                router.push({
                    pathname: '/chat',
                    params: { id: doc.id }
                });
            });
        } else {
            await setDoc(doc(db, 'Chats', docId1), {
                id: docId1,
                users: [
                    {
                        email: user?.primaryEmailAddress?.emailAddress,
                        imageUrl: user?.imageUrl,
                        username: user?.fullName
                    },
                    {
                        email: pet?.email,
                        imageUrl: pet?.userImage,
                        username: pet?.username
                    }
                ],
                userId: [user?.primaryEmailAddress?.emailAddress, pet?.email]
            });
            router.push({
                pathname: '/chat',
                params: { id: docId1 }
            });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <PetInfo pet={pet} />
                <PetSubInfo pet={pet} />
                <AboutPet pet={pet} />
                <Owner pet={pet} />
                <View style={{ height: 75 }}></View>
            </ScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 75,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={InitiateChat}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: 'black',
                        borderWidth: 1,
                        backgroundColor: 'orange',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 20,
                            color: 'white',
                        }}
                    >
                        Adopt Me
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
