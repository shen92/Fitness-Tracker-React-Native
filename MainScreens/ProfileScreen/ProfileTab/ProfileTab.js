import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  RefreshControl,
} from "react-native";
import { styles } from "../Styles";
import UserInputArea from "./UserInputArea";

//Scroll Screen (no bottom)
class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      //authentication
      username: "",
      token: "",
      //screen fields
      firstName: "",
      lastName: "",
      goalDailyCalories: 0.0,
      goalDailyProtein: 0.0,
      goalDailyCarbohydrates: 0.0,
      goalDailyFat: 0.0,
      goalDailyActivity: 0.0,
    };
  }

  //Initialization functions
  componentDidMount() {
    this.getUser().then(() => this.pullUserData());
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

  pullUserData() {
    let requestOptions = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.state.token,
        Authorization: "Basic Og==",
      }),
    };
    let url = "https://mysqlcs639.cs.wisc.edu/users/" + this.state.username;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        this.initUserData(result);
      });
  }

  initUserData(result) {
    result.firstName === null
      ? this.setState({ firstName: "" })
      : this.setState({ firstName: result.firstName });
    result.lastName === null
      ? this.setState({ lastName: "" })
      : this.setState({ lastName: result.lastName });
    this.setState({ goalDailyCalories: result.goalDailyCalories });
    this.setState({ goalDailyProtein: result.goalDailyCalories });
    this.setState({ goalDailyCarbohydrates: result.goalDailyCarbohydrates });
    this.setState({ goalDailyFat: result.goalDailyFat });
    this.setState({ goalDailyActivity: result.goalDailyActivity });
  }

  //Component structure functions
  onRefresh() {
    this.pullUserData();
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
            <UserInputArea
              data={this.state}
              setField={(field, input) => this.setField(field, input)}
              pushUserData={() => this.pushUserData()}
              navigation={this.props.navigation}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  //Component functions
  setField(field, input) {
    if (field === "First Name") {
      this.setState({ firstName: input });
    } else if (field === "Last Name") {
      this.setState({ lastName: input });
    } else if (field === "Goal Daily Calories (cal)") {
      this.setState({ goalDailyCalories: input });
    } else if (field === "Goal Daily Protein (g)") {
      this.setState({ goalDailyProtein: input });
    } else if (field === "Goal Daily Carbohydrates (g)") {
      this.setState({ goalDailyCarbohydrates: input });
    } else if (field === "Goal Daily Fat (g)") {
      this.setState({ goalDailyFat: input });
    } else if (field === "Goal Daily Activity (cal)") {
      this.setState({ goalDailyActivity: input });
    }
  }

  pushUserData() {
    if (this.isValidData()) {
      let url = "https://mysqlcs639.cs.wisc.edu/users/" + this.state.username;
      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": this.state.token,
          Authorization: "Basic Og==",
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          goalDailyCalories: this.state.goalDailyCalories,
          goalDailyProtein: this.state.goalDailyProtein,
          goalDailyCarbohydrates: this.state.goalDailyCarbohydrates,
          goalDailyFat: this.state.goalDailyFat,
          goalDailyActivity: this.state.goalDailyActivity,
        }),
      }).then((res) => {
        if (res.status === 200) {
          alert("Changes saved successfully!");
        }
      });
    } else {
      alert("Please check your input!");
    }
  }

  isValidData() {
    return (
      this.state.goalDailyCalories >= 0 &&
      this.state.goalDailyProtein >= 0 &&
      this.state.goalDailyCarbohydrates >= 0 &&
      this.state.goalDailyFat >= 0 &&
      this.state.goalDailyActivity >= 0
    );
  }

  render() {
    return (
      <View style={styles.sectionRoot}>
        {this.getSectionHead("My Profile")}
        {this.getSectionBody()}
      </View>
    );
  }
}

export default ProfileTab;
