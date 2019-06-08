import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, Image, Animated} from "react-native";
import Unsplash from "unsplash-js/native";
import { toJson } from "unsplash-js/src/unsplash";


export class QuizzOption1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            Question: null,
            answers: [],
            imageURI: null,
            correctAnswer: null,
            questionsAnswers: [],
            questionsAnswered: 0,
            score: 0,
            correctContainerOpacity: new Animated.Value(0),
            wrongContainerOpacity: new Animated.Value(0),
            correctContainerIndex: -100,
            wrongContainerIndex: -100,
            isLoading: true
        };
        

        style = StyleSheet.create({
            getNewButton: {
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: "#0066ff",
                alignItems: "center"
            },
            header: {
                width: "100%",
                height: 200,
                alignItems: "center",
                backgroundColor: "#2c2c2c"
            },
            headerTextWrapper: {
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                alignItems: "center",
                textAlign: "center"
            },
            headerText: {
                color: "white",
                width: "90%",
                fontSize: 20,
                marginTop: 50
            },
            lowerOptions: {
                width: "100%",
                height: "100%",
                backgroundColor: "#2c2c2c",
                alignItems: "center",
            },
            text: {
                color: "#fafafa",
                fontSize: 14,
                marginLeft: 2,
                marginRight: 2,
            },
            optionsWrapper: {
                marginTop: 30
            },
            optionButton: {
                width: 200,
                paddingTop: 15,
                paddingBottom: 15,
                borderColor: "#fafafa",
                borderWidth: 3,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
            },
            correctContainer: {
                backgroundColor: "rgba(0,0,0,0.4)",
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
            },
            wrongContainer: {
                backgroundColor: "rgba(0,0,0,0.4)",
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
            },
            correctAndWrongImage: {
                maxWidth: 90,
                maxHeight: 90,
                marginBottom: 300,
            },
            loader: {
                width: "100%",
                height: "100%",
                backgroundColor: "#2c2c2c",
                alignItems: "center",
            },
            quizzContainerStyle: {
                width: "100%",
                height: "100%"
            },
        });

        // Count for score...Gets updated on correct answers
        this.count = 0;

        // Unsplash api object
        unsplash = new Unsplash({
            applicationId: "c8e666b7a473b350d053a5423aae6be0e42d3aa6258d59531dc5511795853891",
            secret: "2c0324a143eb7d5172a0dfc600e3960ebb7bcc4f8382088a0b62c3731407e92c"
        });
    }

    // Functions ran when the app is about to be displayed
    componentWillMount = async () =>{
        this.showLoader();
        await this.theAPIController();
    };
    
    // Sets the state of loader to true
    showLoader = () => {
        this.setState({
            isLoading: true
        })
    };

    // Sets the state of loader to false
    removeLoader = () => {
        this.setState({
            isLoading: false
        })
    };


    // API Call for Questions...Updates the State...Default URL will return random questions
    apiCall =  (url = "https://opentdb.com/api.php?amount=1&encode=url3986") => {
        fetch(url)
        .then(res => res.json())

        .then(async str => {
            const questionsArr = [];
            const correctAnswer = decodeURIComponent(str.results[0].correct_answer);
            for(i=0; i < str.results[0].incorrect_answers.length; i++){
                questionsArr.push(decodeURIComponent(str.results[0].incorrect_answers[i]))
            }
            questionsArr.push(correctAnswer);

            //Get a picture from Unsplash based on category from the OpenTrivia API
            await unsplash.search.photos(decodeURIComponent(str.results[0].category), 1).then(toJson).then(json =>{
                const imageURI = json.results[Math.floor(Math.random() * 10)].urls.small;
                this.setState({
                    imageURI: imageURI
                });
            });

            this.setState({
                Question: decodeURIComponent(str.results[0].question),
                answers: this.shuffle(questionsArr),
                correctAnswer: correctAnswer
            });

            if(this.state.isLoading) {
                this.removeLoader();
            }

        }).catch();
    };

    // Shuffles the array entered
    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      };

    // For now shows the points earned
    end = () => {
        alert(`${this.state.questionsAnswers.length} Correct answers out of ${this.state.questionsAnswered}`);
    };
    
      
    
    // Lists options based on Array.length
    showOptions = () =>{
        return this.state.answers.map((str, index) => <TouchableOpacity key={index} style={style.optionButton} onPress={() => {this.stackAnswers(str);}}><Text key={index} style={style.text}>{str}</Text></TouchableOpacity>);
    };

    // Displays the "Correct" icon
    showCorrect = () => {
        this.setState({
            correctContainerIndex: 999
        });
        Animated.timing(this.state.correctContainerOpacity,{toValue: 1, duration: 500,}).start();
    }

    // Hides the "Correct" icon
    removeCorrect = () => {
         Animated.timing(this.state.correctContainerOpacity,{toValue: 0, duration: 200,}).start();
        setTimeout(()=> this.setState({
            correctContainerIndex: -100
        }), 350);
    }

    // Displays the "Wrong" icon
    showWrong = () => {
        this.setState({
            wrongContainerIndex: 999
        });
        Animated.timing(this.state.wrongContainerOpacity,{toValue: 1, duration: 500,}).start();
    }

    // Hides the "Wrong" icon
    removeWrong = () => {
         Animated.timing(this.state.wrongContainerOpacity,{toValue: 0, duration: 200,}).start();
        setTimeout(()=> this.setState({
            wrongContainerIndex: -100
        }), 350);
    
    }

    // If the answer given is correct adds it to the array
    stackAnswers = async (str) => {
        if(str === this.state.correctAnswer){
            this.state.questionsAnswers.push(str);
            this.state.score += 5;
            this.state.questionsAnswered++;
            this.showCorrect();
            await this.theAPIController();
             setTimeout(() => this.removeCorrect(), 450);
        } else {
            this.showWrong();
            this.state.questionsAnswered++;
            await this.theAPIController();
            setTimeout(() => this.removeWrong(), 450);
        }
    };

    // Returns the Loader Component
    loaderRender = () => {
        return(
            <View style={style.loader}>
                <ActivityIndicator style={{marginTop: "90%"}} size="large" color="#FFC300"/>
            </View>
        );
    };
    
    // Returns the default options
    defaultOptionsRender = () => {
        return(
            <View style={style.quizzContainerStyle}>

                <TouchableOpacity onPress={this.end} style={style.getNewButton}>
                    <Text style={{fontSize: 30, color: "white"}}>End</Text>
                </TouchableOpacity>

                <View>
                    <ImageBackground style={style.header} source={{uri: this.state.imageURI}}>
                        <View style={style.headerTextWrapper}><Text style={style.headerText}>{this.state.Question}</Text></View>
                    </ImageBackground>
                    <View style={style.lowerOptions}><View style={style.optionsWrapper}>{this.showOptions()}</View></View>
                </View>

            </View>
        )
    };

    // Returns the correct API based on the settings
    theAPIController = () => {
        const {navigation} = this.props;
        const navigationData = navigation.getParam("selectedOption", "Random");
        switch(navigationData){
            // Random returns random questions
            case "Random":
                return this.apiCall();
            break;

            // New optional functionality will be added here
        }
    };

    // The Render statement
    render(){
        let correctIndex = {
            zIndex: this.state.correctContainerIndex,
            opacity: this.state.correctContainerOpacity
        }
        let wrongIndex = {
            zIndex: this.state.wrongContainerIndex,
            opacity: this.state.wrongContainerOpacity
        }
        return(
            <View>

            {/* Is displayed when the given answer is correct */}
            <Animated.View style={[style.correctContainer, correctIndex]}>
                <Image style={style.correctAndWrongImage} source={require("../images/correct.png")}></Image>
            </Animated.View>

            {/* Is displayed when the given answer is wrong/incorrect */}
            <Animated.View style={[style.wrongContainer, wrongIndex]}>
                <Image style={style.correctAndWrongImage} source={require("../images/wrong.png")}></Image>
            </Animated.View>

            {/* Loads the Loader component if the State value is true */}
            {this.state.isLoading ? this.loaderRender() : this.defaultOptionsRender()}
    
            </View>
        );
    };
}