import React, {Component} from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";
import {MainOptions} from "./app/components/MainOptions";
import {Quizz, SelectableQuizz} from "./app/components/Quizzes";

// Root code settings for navigation and this acts like a starting point
const RootStart = createStackNavigator({
  Home: {
    screen: MainOptions,
    navigationOptions: {
      header: null
    }
  },
  Quizz: {
    screen: Quizz,
    navigationOptions: {
      header: null
    }
  },
  SelectableQuizz: {
    screen: SelectableQuizz,
    navigationOptions: {
      header: null
    }
  }
}
);


// Code for future new transition animation

// const transitionConfig = () => {
//   return {
//     transitionSpec: {
//       duration: 750,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//       useNativeDriver: true,
//     },
//     screenInterpolator: sceneProps => {      
//       const { layout, position, scene } = sceneProps

//       const thisSceneIndex = scene.index
//       const width = layout.initWidth

//       const translateX = position.interpolate({
//         inputRange: [thisSceneIndex - 1, thisSceneIndex],
//         outputRange: [width, 0],
//       })

//       return { transform: [ { translateX } ] }
//     },
//   }
// }


// Create the object needed to render the whole app
const AppContainer = createAppContainer(RootStart);

export default class quizzapp extends Component{

  render(){
    return(
      // The Root navigation object
      <AppContainer />
    );
  };
}

