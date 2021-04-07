import React, { useState,useEffect } from 'react';
import { KeyboardAvoidingView,ScrollView,Dimensions,View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors'
import Input from '../components/Input'
import BodyText from '../components/BodyText'
import NumberContainer from '../components/NumberContainer'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton';
const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth , setBbuttonWidth] =useState(Dimensions.get('window').width / 4);

    
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g), '');
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    useEffect(() =>{

    const updateLayout = () =>{
        setBbuttonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change',updateLayout);
    return () => {
        Dimensions.removeEventListener('change',updateLayout);
    }
    });
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{ text: 'okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                Start Game
                </MainButton>
            </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}> Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>  Select a Number</BodyText>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainr}>
                        <View style={{width: buttonWidth}}>
                            <Button title="Reset" onPress={resetInputHandler} color={colors.accent} />
                        </View>
                        <View style={{width: buttonWidth}}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        // maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainr: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     // width: 100
    //     width:  Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
});

export default StartGameScreen;