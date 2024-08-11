import { View, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { GetFavourite, AddToFavourite } from '../Shared/Shared'; // Import both functions properly
import { useUser } from '@clerk/clerk-expo';

export default function MarkFavourite({ pet }) {
    const { user } = useUser();
    const [favourite, setFavourite] = React.useState([]);

    useEffect(() => {
        fetchData();
    }, [user]); // Empty dependency array to run the effect only once
    const fetchData = async () => {
        if (user) {
            try {
                console.log(user?.primaryEmailAddress?.emailAddress);
                const result = await GetFavourite(user);
                console.log(result);
                setFavourite(result?.favourites || []);
                console.log(favourite) // Update the state with the retrieved favorites
            } catch (error) {
                console.error("Failed to fetch favourites:", error);
            }
        }
    };

    const addFavourite = async () => {
        try {
            const newFavourite = favourite;
            newFavourite.push(pet?.id);
            await AddToFavourite(user, newFavourite);
            fetchData()// Update the local state after adding a favourite
        } catch (error) {
            console.error("Failed to add favourite:", error);
        }
    };

    const removeFavourite = async () => {
        try {
            const newFavourite = favourite.filter((id) => id !== pet?.id);
            await AddToFavourite(user, newFavourite);
            fetchData()// Update the local state after removing a favourite
        } catch (error) {
            console.error("Failed to remove favourite:", error);
        }
    }

    const handlePress = () => {
        if (!favourite.includes(pet.id)) {
            addFavourite();
        }else{
            removeFavourite();
        }
    };

    return (
        <View>
            {favourite.includes(pet.id) ? 
                <Pressable onPress={handlePress}>
                    <Entypo 
                        name="heart" 
                        size={50}   
                        color="red" 
                    />
                </Pressable>
                :
                <Pressable onPress={handlePress}>
                    <Entypo 
                        name="heart-outlined" 
                        size={50} 
                        color="black" 
                    />
                </Pressable>
            }
        </View>
    );
}
