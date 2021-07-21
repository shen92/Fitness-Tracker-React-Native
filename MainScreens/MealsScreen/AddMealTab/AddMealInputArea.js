import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";

class AddMealInputArea extends Component {
  constructor(props) {
    super(props);
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
      this.props.date.getFullYear() +
      "-" +
      (this.props.date.getMonth() + 1) +
      "-" +
      this.props.date.getDate()
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
        onChangeText={(input) => this.props.setNewMeal(field, input)}
      />
    );
  }

  getButtonArea() {
    return (
      <View style={local.buttonContainer}>
        <Button
          buttonStyle={local.defaultButton}
          titleStyle={local.buttonText}
          title={"Create Meal"}
          onPress={() => this.handleButtonPress()}
        />
      </View>
    );
  }

  handleButtonPress() {
    this.props.pushMealData();
  }

  render() {
    return (
      <React.Fragment>
        {this.getDateText()}
        {this.getInput("Meal", this.props.name)}
        {this.getButtonArea()}
      </React.Fragment>
    );
  }
}

const local = StyleSheet.create({
  userInput: {
    marginTop: 8,
    alignSelf: "center",
  },

  userInputBox: {
    height: 45,
    width: 300,
    marginTop: 2,
    marginBottom: 8,
    borderColor: "#222831",
    borderWidth: 1,
    fontSize: 18,
    color: "#222831",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 40,
  },

  defaultButton: {
    backgroundColor: "#00adb5",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "82%",
    height: 50,
    borderRadius: 5,
    marginTop: 100,
  },

  buttonText: {
    color: "#eeeeee",
    fontSize: 15,
  },

  defaultText: {
    color: "#222831",
    fontSize: 20,
  },
});

export default AddMealInputArea;
