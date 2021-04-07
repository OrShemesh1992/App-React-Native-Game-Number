import React, { useState,useRef,useEffect } from 'react';
import {Dimensions,View, StyleSheet, Text,Alert, ScrollView ,FlatList} from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyle from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';

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

const renderListItem =(listLength,itemData) =>(    
<View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <Text>{itemData.item}</Text>
    </View>);

const GameScreen = props => {
    const initialGuess = generaterandimbetween(1,100,props.userChoice);
    const [cuurentGuess, setCuurentGuess] = useState(initialGuess);
    const [pastGuesses,setpastGuesses]=useState([initialGuess.toString()]);
    const cuurentLow = useRef(1);
    const cuurentHigh = useRef(100);

    const { userChoice, onGameOver }=props;

    useEffect(()=>{
        if (cuurentGuess === props.userChoice){
            onGameOver(pastGuesses.length);
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
            cuurentLow.current = cuurentGuess + 1;
        }
        const nextNumber=generaterandimbetween(cuurentHigh.current,cuurentLow.current,cuurentGuess);
        setCuurentGuess(nextNumber);
        //setRounds(curRounds => curRounds+1);
        setpastGuesses(curPastGuesses => [nextNumber.toString(),...curPastGuesses])
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyle.title}>
                Opponent's Guess
            </Text>
            <NumberContainer>{cuurentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this,'lower')}>
                <Ionicons name="md-remove" size={24} color='white'/>

                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this,'greater')}>
                <Ionicons name="md-add" size={24} color='white'/>
                </MainButton>
                
            </Card>
            <View style={styles.listContainer}>
            {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length-index))}
            </ScrollView> */}
            <FlatList 
            keyExtractor={(item) => item} 
            data={pastGuesses} 
            renderItem={renderListItem.bind(this,pastGuesses.length)}
            contentContainerStyle={styles.list}
            />
            
            </View>
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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width:400,
    maxWidth: '90%'
},
listContainer:{
    flex:1,
    width:  Dimensions.get('window').width > 350 ? '60%' : '80%'
},
list:{
    flexGrow:1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
},
listItem:{
    borderColor: '#ccc',
    padding:15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
}
});


export default GameScreen;