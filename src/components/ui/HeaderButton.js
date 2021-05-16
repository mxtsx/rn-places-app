import React from 'react';
import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";
import {THEME} from "../../theme";

export const CustomHeaderButton = ({...props}) => {
    return (
        <HeaderButton IconComponent={Ionicons} iconSize={23} color={Platform.OS === 'android' ? '#fff' : THEME.PRIMARY_COLOR} {...props} />
    )
}