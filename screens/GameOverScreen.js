import React from 'react';
import {ScrollView,View,Text,StyleSheet,Image,Dimensions} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BodyText from '../components/BodyText';
import colors from '../constants/colors'
import MainButton from '../components/MainButton';
const GameOverScreen = props =>{
    return (
        <ScrollView>
        <View style={styles.screen}>
            <BodyText>The Game is Over!</BodyText>
            <View style={styles.imagecontainer}>
            <Image 
            source={require('../assets/success.png')} 
            // source={{uri:"https://img.lovepik.com/photo/50048/5023.jpg_wh300.jpg"}} 
            style={styles.image}
            resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text> 
             rounds guess the number <Text style={styles.highlight}>{props.userNumber} .</Text></BodyText>

            </View>
            <MainButton onPress={props.onRestart}>
                NEW GAME
            </MainButton>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center'

    },
    image:{
        width: '100%',
        height: '100%'

    },
    imagecontainer:{
        width: Dimensions.get('window').width *0.7,
        height: Dimensions.get('window').width *0.7,
        borderRadius: Dimensions.get('window').width * 0.7 /2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height /30
    },
    highlight:{
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer:{
        marginHorizontal: 30,
        marginVertical:Dimensions.get('window').height / 60
    },
    resultText:{
      textAlign:'center' ,
      fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;