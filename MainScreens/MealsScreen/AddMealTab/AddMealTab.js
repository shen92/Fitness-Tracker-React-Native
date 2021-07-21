import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { styles } from "../Styles";
import AddMealInputArea from "./AddMealInputArea";

class AddMealTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //authentication
      username: "",
      token: "",
      //New Meal
      name: "",
      date: new Date(), //ISO string
    };
  }

  //Initialization functions
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    try {
      AsyncStorage.getItem("token").then((token) =>
        this.setState({ token: token })
      );
      AsyncStorage.getItem("username").then((username) =>
        this.setState({ username: username })
      );
    } catch (error) {
      alert(error);
    }
  }

  //Component structure functions
  getSectionHead(title) {
    return (
      <View style={styles.sectionHead}>
        <Text style={styles.sectionHeadText}>{title}</Text>
      </View>
    );
  }

  getSectionBody() {
    return (
      <View style={styles.sectionBody}>
        <AddMealInputArea
          name={this.state.name}
          date={this.state.date}
          setNewMeal={(field, input) => this.setNewMeal(field, input)}
          pushMealData={() => this.pushMealData()}
        />
      </View>
    );
  }

  getSectionBottom() {
    return <View style={styles.sectionBottom}></View>;
  }

  //Component functions
  setNewMeal(field, input) {
    if (field === "Meal") {
      this.setState({ name: input });
    }
  }

  isValidInput() {
    return this.state.name !== "";
  }

  pushMealData() {
    if (this.isValidInput()) {
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": this.state.token,
        },
        body: JSON.stringify({
          name: this.state.name,
          date: this.state.date.toISOString(),
        }),
      };
      let url = "https://mysqlcs639.cs.wisc.edu/meals/";
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "Meal created!") {
            alert(res.message);
            this.clearInputArea();
          }
        });
    } else {
      alert("Please check your input!");
    }
  }

  clearInputArea() {
    this.setState({ name: "" });
  }

  render() {
    return (
      <View style={styles.sectionRoot}>
        {this.getSectionHead("Create New Meal")}
        {this.getSectionBody()}
        {this.getSectionBottom()}
      </View>
    );
  }
}

export default AddMealTab;
