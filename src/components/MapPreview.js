import React from 'react';
import {Image} from "react-native";
import {vars} from "../../env";
import {TouchableArea} from "./ui/TouchableArea";

export const MapPreview = ({location, children, onPressHandler, ...props}) => {
    let imgPrev
    const latitude = location?.latitude
    const longitude = location?.longitude
    if(location) {
        imgPrev = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=200&center=lonlat:${longitude},${latitude}&zoom=15.7&marker=lonlat:${longitude},${latitude};color:%23ff0000;size:medium;text:1&apiKey=${vars.mapsApiKey}`
    }
    return (
        <TouchableArea onPress={onPressHandler} style={styles.mapPreview} {...props}>
            {location ? <Image style={styles.mapImage} source={{uri: imgPrev}} /> : children}
        </TouchableArea>
    );
}

const styles = ({
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
})