import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";

class EditFoodInputArea extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setNewFood("Food", this.props.value.name);
    this.props.setNewFood("Calories (cal)", this.props.value.calories);
    this.props.setNewFood("Protein (g)", this.props.value.protein);
    this.props.setNewFood("Carbohydrates (g)", this.props.value.carbohydrates);
    this.props.setNewFood("Fat (g)", this.props.value.fat);
  }

  getInputArea() {
    return (
      <View style={local.userInputContainer}>
        {this.getInput("Food", this.props.data2.name)}
        {this.getInput("Calories (cal)", this.props.data2.calories)}
        {this.getInput("Protein (g)", this.props.data2.protein)}
        {this.getInput("Carbohydrates (g)", this.props.data2.carbohydrates)}
        {this.getInput("Fat (g)", this.props.data2.fat)}
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
        onChangeText={(input) => {
          this.props.setNewFood(field, input);
        }}
      />
    );
  }

  getButtonArea() {
    return (
      <View style={local.buttonContainer}>
        <Button
          buttonStyle={local.deleteButton}
          titleStyle={local.buttonText}
          title={"Delete Food"}
          onPress={() => this.handleButtonPress("delete")}
        />
        <Button
          buttonStyle={local.defaultButton}
          titleStyle={local.buttonText}
          title={"Save"}
          onPress={() => this.handleButtonPress("save")}
        />
      </View>
    );
  }

  isValidInput() {
    return (
      this.props.data2.name !== "" &&
      this.props.data2.calories >= 0 &&
      this.props.data2.protein >= 0 &&
      this.props.data2.carbohydrates >= 0 &&
      this.props.data2.fat >= 0
    );
  }

  handleButtonPress(action) {
    if (action === "save") {
      if (this.isValidInput()) {
        this.props.putFoodData(this.props.value.id);
        this.props.hideEditFoodModal();
      } else {
        alert("Please check your input!");
      }
    } else if (action === "delete") {
      this.props.removeFoodData(this.props.value.id);
      this.props.hideEditFoodModal();
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
    alignItems: "center",
    alignSelf: "center",
  },

  userInputContainer: {
    flex: 4,
  },

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
    flexDirection: "row",
  },

  defaultButton: {
    backgroundColor: "#00adb5",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 50,
    borderRadius: 5,
    margin: 15,
  },

  deleteButton: {
    backgroundColor: "#b22222",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 50,
    borderRadius: 5,
    margin: 15,
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

export default EditFoodInputArea;
