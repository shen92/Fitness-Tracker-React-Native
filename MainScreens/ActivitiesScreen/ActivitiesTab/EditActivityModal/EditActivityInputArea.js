import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput} from "react-native";
import {Button} from "react-native-elements";

class AddActivityInputArea extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setNewActivity('Activity', this.props.value.name);
        this.props.setNewActivity('Duration (min)', this.props.value.duration);
        this.props.setNewActivity('Calories (cal)', this.props.value.calories);
    }

    getInputArea() {
        return (
            <View style={local.userInputContainer}>
                {this.getInput("Activity", this.props.data.name)}
                {this.getInput("Duration (min)", this.props.data.duration)}
                {this.getInput("Calories (cal)", this.props.data.calories)}
            </View>
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
                onChangeText={input => this.props.setNewActivity(field, input)}
            />
        );
    }

    getButtonArea() {
        return (
            <View style={local.buttonContainer}>
                <Button
                    buttonStyle={local.deleteButton}
                    titleStyle={local.buttonText}
                    title={"Delete Activity"}
                    onPress={() => this.handleButtonPress('delete')}
                />
                <Button
                    buttonStyle={local.defaultButton}
                    titleStyle={local.buttonText}
                    title={"Save"}
                    onPress={() => this.handleButtonPress('save')}
                />
            </View>
        );
    }

    handleButtonPress(action) {
        if (action === 'save') {
            this.props.putActivityData(this.props.value.id);
            this.props.hideModal();
        } else if (action === 'delete') {
            this.props.removeActivityData(this.props.value.id);
        }
    }

    render() {
        return (
            <View style={local.root}>
                {this.getInputArea()}
                {this.getButtonArea()}
            </View>
        );
    }
}

const local = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignSelf: 'center',
    },

    userInputContainer: {
        flex: 4,
    },

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
        flexDirection: 'row',
    },

    defaultButton: {
        backgroundColor: '#00adb5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 5,
        margin: 15
    },

    deleteButton: {
        backgroundColor: '#b22222',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 5,
        margin: 15
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

export default AddActivityInputArea;