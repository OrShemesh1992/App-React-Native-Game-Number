import React from 'react';
import { View, Text, StyleSheet,Platform } from 'react-native';
import colors from '../constants/colors'
import TitleText from './TitleText'
const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText> {props.title} </TitleText>
        </View>
    );
};



const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'ios' ? colors.primary: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Header;