import * as React from 'react';
import {useCallback, useLayoutEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Alert, Dimensions, Platform, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../components/ui/HeaderButton";

export const MapScreen = () => {
    const params = useRoute().params
    const initialLocation = params?.initialLocation
    const readonly = params?.readonly

    const [selectedLocation, setSelectedLocation] = useState(initialLocation)
    const navigation = useNavigation()

    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 50.032290,
        longitude: initialLocation ? initialLocation.lng : 14.438636,
        latitudeDelta: 10,
        longitudeDelta: 50
    }

    const selectLocationHandler = (e) => {
        if(readonly) {
            return
        }
        setSelectedLocation({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude,
        })
    }

    let markerCoordinate

    if(selectedLocation) {
        markerCoordinate = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            Alert.alert('Whoops', 'Please, choose a location', [{text: 'Ok'}])
            return
        }
        navigation.navigate('NewPlace', {pickedLocation: markerCoordinate})
    }, [selectedLocation])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Map',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    {!readonly &&
                    <Item title={'Save'} iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
                           onPress={savePickedLocationHandler}/>}
                </HeaderButtons>
            )
        })
    }, [navigation, selectedLocation])

    return (
        <View style={styles.container}>
            <MapView region={mapRegion} style={styles.map} onPress={selectLocationHandler}>
                {markerCoordinate && <Marker title={'Picked Location'} coordinate={markerCoordinate}/>}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});