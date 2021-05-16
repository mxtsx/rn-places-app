import React, {useRef} from 'react';
import {StyleSheet, View} from "react-native";
import * as Animatable from "react-native-animatable"
import {THEME} from "../../theme";
import {TouchableArea} from "./TouchableArea";
import {CustomBoldText} from "./CustomBoldText";

export const CustomButton = ({children, onPress, color, style, disabled}) => {
    const pulseAnimRef = useRef()
    const onPressHandler = () => {
        pulseAnimRef.current.pulse(300)
        onPress && onPress()
    }
    return (
        <Animatable.View ref={pulseAnimRef} style={{...style}}>
            <TouchableArea activeOpacity={0.8}
                                   disabled={!!disabled}
                                   onPress={onPressHandler}>
                <View style={{...styles.animButton, backgroundColor: color ? color : THEME.PRIMARY_COLOR}}>
                    <CustomBoldText style={styles.animButtonText}>
                        {children}
                    </CustomBoldText>
                </View>
            </TouchableArea>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    animButton: {
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    animButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: 'center'
    }
})