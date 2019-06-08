import React, {Component} from "react";
import {ActivityIndicator, View, StyleSheet} from "react-native";

export  class Loader extends Component{
    render(){
        return (
            <View style={style.loader}>
                <ActivityIndicator style={{marginTop: "100%"}} size="large" color="#FFC300"/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    loader: {
        width: "100%",
        height: "100%",
        backgroundColor: "#2c2c2c",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        opacity: 1,
        zIndex: 999,
    }
});