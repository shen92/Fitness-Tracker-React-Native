import React, { Component } from "react";
import { AsyncStorage, Text, TextInput, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

class UserInputArea extends Component {
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
        onChangeText={(input) => this.props.setField(field, input)}
      />
    );
  }

  getButtonArea() {
    return (
      <View style={local.buttonsContainer}>
        {this.getButton("Log Out", "exit")}
        {this.getButton("Save Changes", "save")}
      </View>
    );
  }

  getButton(text, action) {
    if (action === "exit")
      return (
        <Button
          buttonStyle={local.exitButton}
          titleStyle={local.buttonText}
          title={text}
          onPress={() => this.handleButtonPress(action)}
        />
      );
    else
      return (
        <Button
          buttonStyle={local.defaultButton}
          titleStyle={local.buttonText}
          title={text}
          onPress={() => this.handleButtonPress(action)}
        />
      );
  }

  handleButtonPress(action) {
    if (action === "exit") {
      AsyncStorage.clear().then(this.props.navigation.navigate("signIn"));
    } else if (action === "save") {
      this.props.pushUserData();
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.getInput("First Name", this.props.data.firstName)}
        {this.getInput("Last Name", this.props.data.lastName)}
        {this.getInput(
          "Goal Daily Calories (cal)",
          this.props.data.goalDailyCalories
        )}
        {this.getInput(
          "Goal Daily Activity (cal)",
          this.props.data.goalDailyActivity
        )}
        {this.getInput(
          "Goal Daily Protein (g)",
          this.props.data.goalDailyProtein
        )}
        {this.getInput(
          "Goal Daily Carbohydrates (g)",
          this.props.data.goalDailyCarbohydrates
        )}
        {this.getInput("Goal Daily Fat (g)", this.props.data.goalDailyFat)}
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

  buttonsContainer: {
    marginTop: 20,
    justifyContent: "center",
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

  exitButton: {
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

export default UserInputArea;
