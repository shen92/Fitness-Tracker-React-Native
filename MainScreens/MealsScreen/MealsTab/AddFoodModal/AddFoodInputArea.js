import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Button} from "react-native-elements";

class AddFoodInputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //New Food
            name: '',
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0
        }
    }

    getDateText() {
        return (
            <View style={local.userInput}>
                <Text style={local.defaultText}>{this.getDate()}</Text>
            </View>
        );
    }

    getDate() {
        return (
            this.props.data.date.getFullYear() + '-' +
            (this.props.data.date.getMonth() + 1) + '-' +
            this.props.data.date.getDate()
        );
    }

    getInput(field, initValue) {
        return (
            <View style={local.userInput}>
                <Text style={local.defaultText}>{field}</Text>
                {this.getInputBox(field, initValue)}
            </View>
        );
    }

    getInputBox(field, initValue) {
        return (
            <TextInput
                style={local.userInputBox}
                value={"" + initValue}
                onChangeText={input => this.props.setNewFood(field, input)}
            />
        );
    }

    getButtonArea() {
        return (
            <View style={local.buttonContainer}>
                <Button
                    buttonStyle={local.defaultButton}
                    titleStyle={local.buttonText}
                    title={"Create Food"}
                    onPress={() => this.handleButtonPress()}
                />
            </View>
        );
    }

    handleButtonPress() {
        if (this.isValidInput()) {
            this.props.pushFoodData();
            this.props.hideAddFoodModal();
        }else{
            alert("Please check your input!");
        }
    }

    isValidInput() {
        return (
            this.props.data2.name !== '' &&
            this.props.data2.calories >= 0 &&
            this.props.data2.protein >= 0 &&
            this.props.data2.carbohydrates >= 0 &&
            this.props.data2.fat >= 0
        );
    }


    render() {
        return (
            <React.Fragment>
                {this.getDateText()}
                {this.getInput("Food", this.props.data2.name)}
                {this.getInput("Calories (cal)", this.props.data2.calories)}
                {this.getInput("Protein (g)", this.props.data2.protein)}
                {this.getInput("Carbohydrates (g)", this.props.data2.carbohydrates)}
                {this.getInput("Fat (g)", this.props.data2.fat)}
                {this.getButtonArea()}
            </React.Fragment>
        );
    }
}

const local = StyleSheet.create({
    userInput: {
        marginTop: 8,
        alignSelf: 'center'
    },

    userInputBox: {
        height: 45,
        width: 300,
        marginTop: 2,
        marginBottom: 8,
        borderColor: '#222831',
        borderWidth: 1,
        fontSize: 18,
        color: '#222831'
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 40
    },

    defaultButton: {
        backgroundColor: '#00adb5',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: "82%",
        height: 50,
        borderRadius: 5,
        marginTop: 100
    },

    buttonText: {
        color: '#eeeeee',
        fontSize: 15
    },

    defaultText: {
        color: '#222831',
        fontSize: 20
    },
});

export default AddFoodInputArea;