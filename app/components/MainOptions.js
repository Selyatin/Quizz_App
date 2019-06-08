import React, {Component} from "react";
import {View, Text, ImageBackground, TouchableOpacity, StyleSheet} from "react-native";
import Unsplash from "unsplash-js/native";
import { toJson } from "unsplash-js/src/unsplash";

export class MainOptions extends Component {
    state = {
        bgURL: null,
        string: ""
    }
    componentWillMount = () => {
       const unsplash = new Unsplash({
            applicationId: "c8e666b7a473b350d053a5423aae6be0e42d3aa6258d59531dc5511795853891",
            secret: "2c0324a143eb7d5172a0dfc600e3960ebb7bcc4f8382088a0b62c3731407e92c"
        });

        // Gets a random photo URI then updates the state with it
        unsplash.photos.getRandomPhoto().then(toJson).then(json => {
            const imgURL = json.urls.regular;
            this.setState({
                bgURL: imgURL
            })
        });
    }
    render(){
        return(
            <View>
                <ImageBackground source={{uri: this.state.bgURL}} style={style.bgImage}>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("QuizzOption1",{
                            selectedOption: "Random"
                        })} style={style.optionButton1}>
                            <Text style={style.optionButtonText}>Random Quizz</Text>
                        </TouchableOpacity>
                        <Text style={{color: "black"}}>{this.state.string}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const style = StyleSheet.create({
    bgImage: {
        margin: "auto",
        height: "100%",
        width: "100%",
    },
    container: {
        margin: "auto",
        height: "100%",
        alignItems: "center",
        position: "absolute",
        left: 0,
        right: 0,
        top: "32%"
    },
    optionButton1: {
        borderRadius: 30,
        backgroundColor: "#009933",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 12,
        marginBottom: 12
    },
    optionButtonText: {
        color: "white",
        fontSize: 18
    }
});