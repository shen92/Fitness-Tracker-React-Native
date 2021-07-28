import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import { styles } from "../Styles";
import AddActivityInputArea from "./AddActivityInputArea";
import { Config } from "../../../Config";

//Static Screen
class AddActivityTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //authentication
      username: "",
      token: "",
      //New Activity
      name: "",
      duration: 0, // Minutes
      date: new Date(), //ISO string
      calories: 0,
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
        <AddActivityInputArea
          name={this.state.name}
          duration={this.state.duration}
          calories={this.state.calories}
          date={this.state.date}
          setNewActivity={(field, input) => this.setNewActivity(field, input)}
          pushActivityData={() => this.pushActivityData()}
        />
      </View>
    );
  }

  getSectionBottom() {
    return <View style={styles.sectionBottom}></View>;
  }

  //Component functions
  setNewActivity(field, input) {
    if (field === "Activity") {
      this.setState({ name: input });
    } else if (field === "Duration (min)") {
      this.setState({ duration: input });
    } else if (field === "Calories (cal)") {
      this.setState({ calories: input });
    }
  }

  isValidInput() {
    return (
      this.state.name !== "" &&
      this.state.duration > 0 &&
      this.state.calories > 0
    );
  }

  pushActivityData() {
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
          duration: this.state.duration, // Minutes
          date: this.state.date.toISOString(),
          calories: this.state.calories,
        }),
      };
      const url = `${Config.BASE_URL}/activities/`;
      fetch(url, requestOptions).then((res) => {
        if (res.status === 200) {
          alert("Activity created!");
          this.clearInputArea();
        }
      });
    } else {
      alert("Please check your input!");
    }
  }

  clearInputArea() {
    this.setState({ name: "" });
    this.setState({ duration: 0 });
    this.setState({ calories: 0 });
  }

  render() {
    return (
      <View style={styles.sectionRoot}>
        {this.getSectionHead("Create New Activity")}
        {this.getSectionBody()}
        {this.getSectionBottom()}
      </View>
    );
  }
}

export default AddActivityTab;
