import React from 'react';
import {StyleSheet, Text} from "react-native";

export const CustomMediumText = ({children, style, ...props}) => {
    return (
        <Text style={{...styles.font, ...style}} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    font: {
        fontFamily: 'robotoReg'
    }
})