import React, { Component } from "react";
import { styles } from "../Styles";
import {
  AsyncStorage,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import ActivitiesList from "./ActivitiesList";

//Scroll Screen
class ActivitiesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      //authentication
      username: "",
      token: "",
      //Component data flow
      date: new Date(), //ISO string
      activities: [],
      //New Activity
      name: "",
      duration: 0, // Minutes
      calories: 0,
    };
  }

  //Initialization functions
  componentDidMount() {
    this.getUser().then(() => this.pullActivitiesData());
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.pullActivitiesData();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  async getUser() {
    try {
      let token = await AsyncStorage.getItem("token");
      this.setState({ token: token });
      let username = await AsyncStorage.getItem("username");
      this.setState({ username: username });
    } catch (error) {
      alert(error);
    }
  }

  pullActivitiesData() {
    console.log("pull activities");
    let requestOptions = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.state.token,
        Authorization: "Basic Og==",
      }),
    };
    let url = "https://mysqlcs639.cs.wisc.edu/activities/";
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        this.setActivitiesData(result);
      });
  }

  setActivitiesData(result) {
    this.setState({ activities: result.activities });
  }

  //Component structure functions
  onRefresh() {
    this.pullActivitiesData();
    this.setState({ refresh: false });
  }

  getSectionHead(title) {
    return (
      <View style={styles.sectionHead}>
        <Text style={styles.sectionHeadText}>{title}</Text>
      </View>
    );
  }

  getSectionBody() {
    return (
      <View style={styles.sectionBody2}>
        <SafeAreaView style={styles.sectionBodyScrollContainer}>
          <ScrollView
            style={styles.sectionBodyScrollView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            <ActivitiesList
              data={this.state}
              removeActivityData={(id) => this.removeActivityData(id)}
              putActivityData={(id) => this.putActivityData(id)}
              setNewActivity={(field, input) =>
                this.setNewActivity(field, input)
              }
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  //Component functions
  removeActivityData(id) {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.state.token,
        Authorization: "Basic Og==",
      },
    };
    let url = "https://mysqlcs639.cs.wisc.edu/activities/" + id;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
        this.pullActivitiesData();
      });
  }

  putActivityData(id) {
    if (this.isValidInput()) {
      let requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": this.state.token,
          Authorization: "Basic Og==",
        },
        body: JSON.stringify({
          name: this.state.name,
          calories: this.state.calories,
          duration: this.state.duration, // Minutes
          //date: this.state.date.toISOString(),
        }),
      };
      let url = "https://mysqlcs639.cs.wisc.edu/activities/" + id;
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
          console.log(result.message);
          this.clearInputArea();
          this.pullActivitiesData();
        });
    } else {
      alert("Please check your input!");
    }
  }

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

  clearInputArea() {
    this.setState({ name: "" });
    this.setState({ duration: 0 });
    this.setState({ calories: 0 });
  }

  render() {
    return (
      <View style={styles.sectionRoot}>
        {this.getSectionHead("Activities")}
        {this.getSectionBody()}
      </View>
    );
  }
}

export default ActivitiesTab;
