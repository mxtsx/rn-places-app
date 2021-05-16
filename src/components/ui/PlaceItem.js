import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {THEME} from "../../theme";
import {TouchableArea} from "./TouchableArea";

export const PlaceItem = ({onSelect, image, title, address, itemId, longPressHandler,  ...props}) => {
    return (
        <TouchableArea onPress={onSelect} onLongPress={longPressHandler} style={styles.placeItem}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.address}>{address}</Text>
            </View>
        </TouchableArea>
    )
}

const styles = StyleSheet.create({
    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: THEME.PRIMARY_COLOR,
        borderWidth: 1
    },
    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5
    },
    address: {
        color: '#666',
        fontSize: 16
    }
})