import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import base64 from "base-64";
import { styles } from "./Styles";

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
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
          value={this.state.password}
          onChangeText={(password) => this.setState({ password: password })}
        />
      );
    else
      return (
        <TextInput
          secureTextEntry={false}
          style={styles.inputBox}
          value={this.state.username}
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
    if (action === "sign-in") {
      AsyncStorage.clear().then(this.signInUser().then());
    } else if (action === "sign-up") {
      this.clearInputFields();
      this.props.navigation.navigate("signUp");
    }
  }

  async signInUser() {
    let requestOptions = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          base64.encode(this.state.username + ":" + this.state.password),
      }),
    };

    try {
      let response = await fetch(
        "https://mysqlcs639.cs.wisc.edu/login",
        requestOptions
      );
      let result = await response.json();
      if (response.status === 200) {
        this.setState({ token: result.token });
        await this.setUser();
        this.props.navigation.navigate("Home");
        this.clearInputFields();
      } else if (response.status === 401) {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async setUser() {
    try {
      await AsyncStorage.setItem("token", this.state.token);
      await AsyncStorage.setItem("username", this.state.username);
    } catch (error) {
      alert(error);
    }
  }

  clearInputFields() {
    this.setState({ username: "" });
    this.setState({ password: "" });
  }

  showScreen() {
    return (
      <View style={styles.root}>
        <View style={styles.appNameContainer}>
          {this.getScreenTitle("MyFitness")}
        </View>
        <View style={styles.inputContainer}>
          {this.getInputArea("Username", 0)}
          {this.getInputArea("Password", 1)}
        </View>
        <View style={styles.buttonsContainer}>
          {this.getButton("Sign up", "sign-up")}
          {this.getButton("Sign in", "sign-in")}
        </View>
      </View>
    );
  }

  render() {
    return <React.Fragment>{this.showScreen()}</React.Fragment>;
  }
}

export default SignInScreen;
