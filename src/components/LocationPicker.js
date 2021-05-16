import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import * as Location from 'expo-location';
import {CustomMediumText} from "./ui/CustomMediumText";
import {CustomButton} from "./ui/CustomButton";
import {THEME} from "../theme";
import {MapPreview} from "./MapPreview";
import {useNavigation, useRoute} from "@react-navigation/native";

export const LocationPicker = ({location, setLocation}) => {
    const navigation = useNavigation()
    const [isFetching, setIsFetching] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const pickedLocation = useRoute().params?.pickedLocation

    useEffect(() => {
        if(pickedLocation) {
            setLocation(pickedLocation)
        }
    }, [pickedLocation])

    const userLocationHandler = async () => {
        setIsFetching(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        setIsFetching(false)
    }

    const pickOnMapHandler = async () => {
        navigation.navigate('MapScreen')
    }

    let text = 'No location chosen yet!';
    if (errorMsg) {
        Alert.alert('Error', 'Please try again', [{text: 'Ok'}])
        console.log(errorMsg)
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            <MapPreview location={location} onPressHandler={pickOnMapHandler}>
                {isFetching ? <ActivityIndicator size={'large'} color={THEME.PRIMARY_COLOR}/>
                    : <CustomMediumText>{text}</CustomMediumText>}
            </MapPreview>
            <View style={styles.buttons}>
            <CustomButton onPress={userLocationHandler}>Get Location</CustomButton>
            <CustomButton onPress={pickOnMapHandler}>Pick on Map</CustomButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});