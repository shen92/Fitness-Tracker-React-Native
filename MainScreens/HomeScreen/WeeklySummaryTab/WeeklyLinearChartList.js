import React, { Component } from "react";
import DailyCard from "./DailyCard";
import WeeklyLinearChart from "./WeeklyLinearChart";

class WeeklyLinearChartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesList: [],
      nutritionList: [],
      calories: [],
      nutrition: [],
    };
  }

  componentWillReceiveProps() {
    this.updateWeek();
    this.getChartData();
  }

  updateWeek() {
    let calories = [];
    let nutrition = [];
    for (const day of Object.values(this.props.data.week)) {
      let weekdayCalories = [];
      let weekdayNutrition = [];
      let dailyCalories = 0;
      let dailyActivity = 0;
      let dailyProtein = 0;
      let dailyCarbohydrates = 0;
      let dailyFat = 0;
      let activities = day[1];
      for (const activity of Object.values(activities)) {
        dailyCalories -= activity.calories;
        dailyActivity += activity.calories;
      }
      let meals = day[2];
      for (const meal of Object.values(meals)) {
        for (const food of Object.values(meal[1])) {
          dailyCalories += food.calories;
          dailyProtein += food.protein;
          dailyCarbohydrates += food.carbohydrates;
          dailyFat += food.fat;
        }
      }
      weekdayCalories.push(dailyCalories);
      weekdayCalories.push(dailyActivity);
      weekdayNutrition.push(dailyProtein);
      weekdayNutrition.push(dailyCarbohydrates);
      weekdayNutrition.push(dailyFat);
      calories.push(weekdayCalories);
      nutrition.push(weekdayNutrition);
    }
    this.setState({ caloriesList: calories });
    this.setState({ nutritionList: nutrition });
  }

  getChartData() {
    let calories = [];
    let nutrition = [];
    if (
      this.state.caloriesList.length !== 0 &&
      this.state.nutritionList.length != 0
    ) {
      for (let i = 0; i < 7; i++) {
        calories.push({
          calories: this.state.caloriesList[i][0],
          activity: this.state.caloriesList[i][1],
        });
        nutrition.push({
          protein: this.state.nutritionList[i][0],
          carbohydrates: this.state.nutritionList[i][1],
          fat: this.state.nutritionList[i][2],
        });
      }
      this.setState({ calories: calories });
      this.setState({ nutrition: nutrition });
    }
  }

  getChartList() {
    let charts = [];
    charts.push(
      <WeeklyLinearChart key={1} title={"Calories"} data={this.state} />
    );
    charts.push(
      <WeeklyLinearChart key={2} title={"Nutrition"} data={this.state} />
    );
    return charts;
  }

  render() {
    return <React.Fragment>{this.getChartList()}</React.Fragment>;
  }
}

export default WeeklyLinearChartList;
