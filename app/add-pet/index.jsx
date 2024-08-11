import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db, Storage } from '../../config/FireBaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';
export default function AddPet() {
    const navigation = useNavigation();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [image, setImage] = useState(null);
    const { user } = useUser();
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        category: 'Dogs',
        sex: 'Male',
        name: '',
        breed: '',
        age: '',
        weight: '',
        address: '',
        about: ''
    });
    const [gender, setGender] = useState('Male'); // Initialize with a default value

    const GetCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Category'));
            const categories = [];
            querySnapshot.forEach((doc) => {
                categories.push(doc.data());
            });
            setCategoryList(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: 'Add Pet',
        });
        GetCategories();
    }, []);

    const ImagePickerHandler = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleInputChange = (fieldName, fieldValue) => {
        setFormData({
            ...formData,
            [fieldName]: fieldValue
        });
    };

    const validateForm = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    const onsubmit = async () => {
        if (!validateForm()) {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
            return;
        }

        setLoader(true);
        try {
            const imageUrl = await uploadImage(image);
            await saveFormData(imageUrl);
            ToastAndroid.show('Pet added successfully!', ToastAndroid.SHORT);
            router.replace('/(tabs)/home')
        } catch (error) {
            console.error('Error submitting form:', error);
            ToastAndroid.show('Error adding pet. Please try again.', ToastAndroid.SHORT);
        } finally {
            setLoader(false);
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageRef = ref(Storage, `PetAdopt/${Date.now()}`); // Specify a unique path for the image
        await uploadBytes(imageRef, blob);
        const url = await getDownloadURL(imageRef);
        return url;
    };

    const saveFormData = async (imageUrl) => {
        const docId = Date.now().toString();
        const petData = {
            ...formData,
            imageUrl: imageUrl,
            userName: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            id: docId
        };
        await setDoc(doc(db, 'Pets', docId), petData);
    };

    return (
        <ScrollView style={{ padding: 20, marginTop: 75 }}>
            <Text style={{ fontSize: 20, marginBottom: 10, fontFamily: 'outfit-bold' }}>
                Add New Pet for Adoption
            </Text>
            <Pressable onPress={ImagePickerHandler}>
                {!image ? (
                    <Image
                        source={require('../../assets/images/placeholder.png')}
                        style={{
                            width: 100,
                            height: 100,
                            marginBottom: 10,
                            borderRadius: 50,
                            borderColor: 'black',
                            borderWidth: 1
                        }}
                    />
                ) : (
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: 100,
                            height: 100,
                            marginBottom: 10,
                            borderRadius: 50,
                            borderColor: 'black',
                            borderWidth: 1
                        }}
                    />
                )}
            </Pressable>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pet Name</Text>
                <TextInput
                    placeholder='Enter Pet Name'
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('name', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Breed</Text>
                <TextInput
                    placeholder='Enter your pet breed'
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('breed', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                    placeholder='Enter Pet Age'
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('age', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Weight</Text>
                <TextInput
                    placeholder='Weight'
                    keyboardType='numeric'
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('weight', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender</Text>
                <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue) => {
                        setGender(itemValue);
                        handleInputChange('sex', itemValue);
                    }}
                >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Category</Text>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.input}
                    onValueChange={(itemValue) => {
                        setSelectedCategory(itemValue);
                        handleInputChange('category', itemValue);
                    }}
                >
                    {categoryList.map((category, index) => (
                        <Picker.Item key={index} label={category.name} value={category.name} />
                    ))}
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    placeholder='Enter Address'
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('address', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>About</Text>
                <TextInput
                    placeholder='About your pet'
                    style={styles.input}
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={(value) => handleInputChange('about', value)}
                />
            </View>
            <TouchableOpacity
                onPress={onsubmit}
                disabled={loader}
                style={{ marginBottom: 50 }}
            >
                {loader ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Text
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            padding: 10,
                            textAlign: 'center',
                            borderRadius: 10,
                            marginTop: 10,
                        }}
                    >
                        Add Pet
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = {
    inputContainer: {
        marginVertical: 5
    },
    input: {
        padding: 10,
        borderColor: 'gray',
        backgroundColor: '#f9f9f9',
        borderRadius: 7,
    },
    label: {
        marginVertical: 5,
        fontFamily: 'outfit-bold',
        fontSize: 16,
        marginBottom: 5
    }
};
