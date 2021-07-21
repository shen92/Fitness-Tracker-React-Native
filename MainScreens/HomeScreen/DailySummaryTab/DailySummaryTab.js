import React, { Component } from "react";
import {
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { styles } from "../Styles";
import DailySummaryStackChart from "./DailySummaryStackChart";
import DailySummaryStatisticsTable from "./DailySummaryStatisticsTable";

//Static Screen
class DailySummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      //authentication
      username: "",
      token: "",
      //screen fields
      date: new Date(),
      //SEVER Data
      firstName: "",
      goalDailyCalories: 0.0,
      goalDailyProtein: 0.0,
      goalDailyCarbohydrates: 0.0,
      goalDailyFat: 0.0,
      goalDailyActivity: 0.0,
      activities: [], //sever activities
      rawMeals: [], //sever meals
      meals: [],
      //LOCAL Data
      dailyCalories: 0.0,
      dailyActivity: 0.0,
      dailyProtein: 0.0,
      dailyCarbohydrates: 0.0,
      dailyFat: 0.0,
      chartCalories: [],
      chartNutrition: [],
    };
  }

  //Initialization functions
  componentDidMount() {
    this.getUser().then(() => this.updateScreen());
    this.focusListener = this.props.navigation.addListener("didFocus", () =>
      this.updateScreen()
    );
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

  updateScreen() {
    this.pullUserProfileData();
    this.pullActivitiesData();
    this.pullMealsData();
    this.setMealFoods();
    this.updateDailyData();
    this.setChartData();
  }

  pullUserProfileData() {
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
        this.setUserProfileData(result);
      });
  }

  setUserProfileData(result) {
    result.firstName === null
      ? this.setState({ firstName: "" })
      : this.setState({ firstName: result.firstName });
    this.setState({ goalDailyCalories: result.goalDailyCalories });
    this.setState({ goalDailyProtein: result.goalDailyProtein });
    this.setState({ goalDailyCarbohydrates: result.goalDailyCarbohydrates });
    this.setState({ goalDailyFat: result.goalDailyFat });
    this.setState({ goalDailyActivity: result.goalDailyActivity });
  }

  pullActivitiesData() {
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
    this.setState({ rawMeals: result.meals });
  }

  setMealFoods() {
    let meals = [];
    for (let i = 0; i < this.state.rawMeals.length; i++) {
      let meal = [];
      meal.push(this.state.rawMeals[i]);
      meal.push(this.pullFoodData(this.state.rawMeals[i].id));
      meals.push(meal);
    }
    this.setState({ meals: meals });
  }

  pullFoodData(id) {
    let foods = [];
    let requestOptions = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.state.token,
        Authorization: "Basic Og==",
      }),
    };
    let url = "https://mysqlcs639.cs.wisc.edu/meals/" + id + "/foods";
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        for (const food of Object.values(result.foods)) {
          foods.push(food);
        }
      });
    return foods;
  }

  //Component structure functions
  onRefresh() {
    this.updateScreen();
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
            {this.getGreetings()}
            <Text style={local.defaultText}>This is your daily summary of</Text>
            <Text style={local.dateText}>{this.getDate()}</Text>
            <View style={local.chartContainer}>
              <DailySummaryStackChart
                chartCalories={this.state.chartCalories}
                chartNutrition={this.state.chartNutrition}
              />
            </View>
            <View style={local.statisticsTableContainer}>
              <DailySummaryStatisticsTable data={this.state} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  //Component functions
  getDate() {
    return (
      this.state.date.getFullYear() +
      "-" +
      (this.state.date.getMonth() + 1) +
      "-" +
      this.state.date.getDate()
    );
  }

  getGreetings() {
    if (this.state.date.getHours() >= 6 && this.state.date.getHours() < 13) {
      if (this.state.firstName !== "") {
        return (
          <React.Fragment>
            <Text style={local.defaultText}>Good morning,</Text>
            <Text style={local.nameText}>{this.state.firstName}!</Text>
          </React.Fragment>
        );
      } else {
        return <Text style={local.defaultText}>Good morning!</Text>;
      }
    } else if (
      this.state.date.getHours() >= 13 &&
      this.state.date.getHours() < 18
    ) {
      if (this.state.firstName !== "") {
        return (
          <React.Fragment>
            <Text style={local.defaultText}>Good afternoon,</Text>
            <Text style={local.nameText}>{this.state.firstName}!</Text>
          </React.Fragment>
        );
      } else {
        return <Text style={local.defaultText}>Good afternoon!</Text>;
      }
    } else if (
      this.state.date.getHours() >= 18 ||
      this.state.date.getHours() < 6
    ) {
      if (this.state.firstName !== "") {
        return (
          <React.Fragment>
            <Text style={local.defaultText}>Good evening,</Text>
            <Text style={local.nameText}>{this.state.firstName}!</Text>
          </React.Fragment>
        );
      } else {
        return <Text style={local.defaultText}>Good evening!</Text>;
      }
    }
  }

  isActivityToday(activity) {
    let activityDate = activity.date.split(/\D+/);
    let ISODate = this.state.date.toISOString();
    let curr = ISODate.split(/\D+/);
    if (
      activityDate[0] === curr[0] &&
      activityDate[1] === curr[1] &&
      activityDate[2] === curr[2]
    ) {
      return true;
    } else {
      return false;
    }
  }

  isMealToday(meal) {
    let mealDate = meal.date.split(/\D+/);
    let ISODate = this.state.date.toISOString();
    let curr = ISODate.split(/\D+/);
    if (
      mealDate[0] === curr[0] &&
      mealDate[1] === curr[1] &&
      mealDate[2] === curr[2]
    ) {
      return true;
    } else {
      return false;
    }
  }

  updateDailyData() {
    let dailyCalories = 0;
    let dailyActivity = 0;
    let dailyProtein = 0;
    let dailyCarbohydrates = 0;
    let dailyFat = 0;
    for (const activity of Object.values(this.state.activities)) {
      if (this.isActivityToday(activity)) {
        dailyCalories -= activity.calories;
        dailyActivity += activity.calories;
      }
    }
    for (const meal of Object.values(this.state.meals)) {
      if (this.isMealToday(meal[0])) {
        for (const food of Object.values(meal[1])) {
          dailyCalories += food.calories;
          dailyProtein += food.protein;
          dailyCarbohydrates += food.carbohydrates;
          dailyFat += food.fat;
        }
      }
    }
    this.setState({ dailyCalories: dailyCalories });
    this.setState({ dailyActivity: dailyActivity });
    this.setState({ dailyProtein: dailyProtein });
    this.setState({ dailyCarbohydrates: dailyCarbohydrates });
    this.setState({ dailyFat: dailyFat });
  }

  setChartData() {
    let chartCalories = [];
    let chartNutrition = [];
    chartCalories.push({
      goal: this.state.goalDailyCalories,
      daily: this.state.dailyCalories,
      label: "Calories",
    });
    chartCalories.push({
      goal: this.state.goalDailyActivity,
      daily: this.state.dailyActivity,
      label: "Activity",
    });
    chartNutrition.push({
      goal: this.state.goalDailyProtein,
      daily: this.state.dailyProtein,
      label: "Protein",
    });
    chartNutrition.push({
      goal: this.state.goalDailyCarbohydrates,
      daily: this.state.dailyCarbohydrates,
      label: "Carbohydrates",
    });
    chartNutrition.push({
      goal: this.state.goalDailyFat,
      daily: this.state.dailyFat,
      label: "Fat",
    });
    this.setState({ chartCalories: chartCalories });
    this.setState({ chartNutrition: chartNutrition });
  }

  render() {
    return (
      <View style={styles.sectionRoot}>
        {this.getSectionHead("Daily Summary")}
        {this.getSectionBody()}
      </View>
    );
  }
}

const local = StyleSheet.create({
  chartContainer: {
    flex: 1,
    flexDirection: "column",
    height: 250,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },

  statisticsTableContainer: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },

  defaultText: {
    color: "#222831",
    fontSize: 20,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },

  nameText: {
    color: "#222831",
    fontSize: 45,
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: 2,
    marginBottom: 2,
  },

  dateText: {
    color: "#222831",
    fontSize: 30,
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: 2,
    marginBottom: 2,
  },
});

export default DailySummaryTab;
