import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {MapPreview} from "../components/MapPreview";
import {useSelector} from "react-redux";
import {CustomMediumText} from "../components/ui/CustomMediumText";
import {THEME} from "../theme";

export const PlaceDetailScreen = () => {
    const {id} = useRoute().params
    const place = useSelector(state => state.places.places.find(p => p.id === id))
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: place.title
        })
    }, [navigation])

    const showMapHandler = () => {
        navigation.navigate('MapScreen', {readonly: true, initialLocation: {lat: place.lat, lng: place.lng}})
    }

    let location

    if (place.lat && place.lng) {
        location = {
            latitude: place.lat,
            longitude: place.lng
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.image} source={{uri: place.image}} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <CustomMediumText style={styles.address}>
                        {place.address}
                    </CustomMediumText>
                </View>
                <MapPreview style={styles.mapPreview} location={location} onPressHandler={showMapHandler}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: THEME.PRIMARY_COLOR,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
})