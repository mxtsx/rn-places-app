import React from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";

export const TouchableArea = ({children, style, ...props}) => {
    let Area = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        Area = TouchableNativeFeedback
    }
    return (
        <Area {...props}>
            <View style={{...style}}>
                {children}
            </View>
        </Area>
    )
}