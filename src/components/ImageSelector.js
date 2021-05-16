import React, {useEffect} from 'react';
import {Image, Platform, StyleSheet, View} from "react-native";
import {CustomMediumText} from "./ui/CustomMediumText";
import {CustomButton} from "./ui/CustomButton";
import * as ImagePicker from 'expo-image-picker'
import {TouchableArea} from "./ui/TouchableArea";

export const ImageSelector = ({image, setImage}) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <View style={styles.picker}>
            <View style={styles.preview}>
                {!image ? <TouchableArea onPress={pickImage} style={styles.noPicture}><CustomMediumText>No image picked yet.</CustomMediumText></TouchableArea>
                    : <Image source={{uri: image}} style={styles.image} />}
            </View>
            <CustomButton onPress={pickImage}>Take image</CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    picker: {
        alignItems: 'center'
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    noPicture: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})