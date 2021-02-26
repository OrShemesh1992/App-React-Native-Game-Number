import React, { useState,useRef,useEffect } from 'react';
import { View, StyleSheet, Text, Button,Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generaterandimbetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generaterandimbetween(min, max, exclude);
    } else {
        return rndNum;
    }
};
const GameScreen = props => {
    const [cuurentGuess, setCuurentGuess] = useState(generaterandimbetween(1,100,props.userChoice));
    const [rounds,setRounds]=useState(0);
    const cuurentLow = useRef(1);
    const cuurentHigh = useRef(100);

    const { userChoice, onGameOver }=props;

    useEffect(()=>{
        if (cuurentGuess === props.userChoice){
            onGameOver(rounds);
        }
    },[cuurentGuess,userChoice,onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && cuurentGuess < props.userChoice)||(direction === 'greater' && cuurentGuess > props.userChoice)){
            Alert.alert('Don\'t lie!','You know that this is wrong...',[{text: 'sorry!',style: 'cancel'}])
            return;
        }
        if(direction === 'lower'){
            cuurentHigh.current = cuurentGuess;
        }else{
            cuurentLow.current = cuurentGuess;
        }
        const nextNumber=generaterandimbetween(cuurentHigh.current,cuurentLow.current,cuurentGuess);
        setCuurentGuess(nextNumber);
        setRounds(curRounds => curRounds+1);
    };

    return (
        <View style={styles.screen}>
            <Text>
                Opponent's Guess
            </Text>
            <NumberContainer>{cuurentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this,'lower')}/>
                <Button title="GREATER" onPress={nextGuessHandler.bind(this,'greater')}/>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
screen:{
    flex:1,
    padding:10,
    alignItems:'center'
},
buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:20,
    width:300,
    maxWidth: '80%'
}
});


export default GameScreen;