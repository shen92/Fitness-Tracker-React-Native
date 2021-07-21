import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "./Styles";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  getScreenTitle(title) {
    return (
      <React.Fragment>
        <Text style={styles.appName}>{title}</Text>
      </React.Fragment>
    );
  }

  getInputArea(type, password) {
    return (
      <React.Fragment>
        <Text style={styles.defaultText}>{type}</Text>
        {this.getInputBox(password)}
      </React.Fragment>
    );
  }

  getInputBox(password) {
    if (password === 1)
      return (
        <TextInput
          secureTextEntry={true}
          style={styles.inputBox}
          onChangeText={(password) => this.setState({ password: password })}
        />
      );
    else
      return (
        <TextInput
          secureTextEntry={false}
          style={styles.inputBox}
          onChangeText={(username) => this.setState({ username: username })}
        />
      );
  }

  getButton(text, action) {
    return (
      <Button
        title={text}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => this.handleButtonPress(action)}
      />
    );
  }

  handleButtonPress(action) {
    if (action === "create") {
      this.createNewUser();
    } else if (action === "cancel") {
      this.clearInputFields();
      this.props.navigation.navigate("signIn");
    }
  }

  createNewUser() {
    if (!this.isValidUsername()) {
      alert("Please input your username!");
      return false;
    }

    if (!this.isValidPassword()) {
      alert("Password should be at least 8 characters!");
      return false;
    }

    if (this.signUpUser()) {
      return true;
    }

    return false;
  }

  isValidUsername() {
    return this.state.username.length != 0;
  }

  isValidPassword() {
    return this.state.password.length >= 8;
  }

  signUpUser() {
    fetch("https://mysqlcs639.cs.wisc.edu/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then((res) => {
      if (res.status === 409) {
        alert(this.state.username + " has already been used!");
      }
      if (res.status === 200) {
        alert("New user created!");
        console.log("(System) User create success");
        this.clearInputFields();
        this.props.navigation.navigate("signIn");
      }
    });
  }

  clearInputFields() {
    this.setState({ username: "" });
    this.setState({ password: "" });
  }

  showPage() {
    return (
      <View style={styles.root}>
        <View style={styles.appNameContainer}>
          {this.getScreenTitle("New Account")}
        </View>
        <View style={styles.inputContainer}>
          {this.getInputArea("Username", 0)}
          {this.getInputArea("Password", 1)}
        </View>
        <View style={styles.buttonsContainer}>
          {this.getButton("Cancel", "cancel")}
          {this.getButton("Create new User", "create")}
        </View>
      </View>
    );
  }

  render() {
    return <React.Fragment>{this.showPage()}</React.Fragment>;
  }
}

export default SignUpScreen;
