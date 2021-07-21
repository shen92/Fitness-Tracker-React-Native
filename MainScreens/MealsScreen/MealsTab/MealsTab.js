import React, { Component } from "react";
import { styles } from "../Styles";
import {
  AsyncStorage,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MealsList from "./MealsList";

//Scroll Screen
class MealsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      //authentication
      username: "",
      token: "",
      //Component data flow
      date: new Date(), //ISO string
      meals: [],
      //New Meal
      name: "",
    };
  }

  //Initialization functions
  componentDidMount() {
    this.getUser().then(() => this.pullMealsData());
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.pullMealsData();
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

  pullMealsData() {
    let requestOptions = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.state.token,
        Authorization: "Basic Og==",
      }),
    };
    let url = "https://mysqlcs639.cs.wisc.edu/meals/";
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        this.setMealsData(result);
      });
  }

  setMealsData(result) {
    this.setState({ meals: result.meals });
  }

  //Component structure functions
  onRefresh() {
    this.pullMealsData();
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
            <MealsList
              data={this.state}
              removeMealData={(id) => this.removeMealData(id)}
              putMealData={(id) => this.putMealData(id)}
              setNewMeal={(field, input) => this.setNewMeal(field, input)}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  //Component functions
  removeMealData(id) {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.state.token,
      },
    };
    let url = "https://mysqlcs639.cs.wisc.edu/meals/" + id;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        this.pullMealsData();
      });
  }

  putMealData(id) {
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
          //date: this.state.date.toISOString(),
        }),
      };
      let url = "https://mysqlcs639.cs.wisc.edu/meals/" + id;
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
          this.clearInputArea();
          this.pullMealsData();
        });
    } else {
      alert("Please check your input!");
    }
  }

  setNewMeal(field, input) {
    if (field === "Meal") {
      this.setState({ name: input });
    }
  }

  isValidInput() {
    return this.state.name !== "";
  }

  clearInputArea() {
    this.setState({ name: "" });
  }

  render() {
    return (
      <View style={styles.sectionRoot}>
        {this.getSectionHead("Meals")}
        {this.getSectionBody()}
      </View>
    );
  }
}

export default MealsTab;
