import React, { Component } from "react";
import { StackedAreaChart, LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { StyleSheet, View, Text } from "react-native";

class WeeklyLinearChart extends Component {
  normalize(data) {
    return data.map((item) => {
      return {
        activity: item.activity > 0 ? item.activity : 0,
        calories: item.calories > 0 ? item.calories : 0,
      };
    });
  }

  getCaloriesChart() {
    const colors = ["#9852f9", "#c299fc"];

    const data = [
      {
        data: this.props.data.calories.map((item) =>
          item.activity < 0 ? 0 : item.activity
        ),
        svg: { stroke: colors[0] },
      },
      {
        data: this.props.data.calories.map((item) =>
          item.calories < 0 ? 0 : item.calories
        ),
        svg: { stroke: colors[1] },
      },
    ];

    return (
      <View>
        <LineChart
          style={local.chart}
          data={data}
          contentInset={{ top: 10, bottom: 10 }}
        >
          <Grid />
        </LineChart>
      </View>
    );
  }

  getNutritionChart() {
    const colors = ["#3c9d9b", "#00adb5", "#52de97"];

    const data = [
      {
        data: this.props.data.nutrition.map((item) =>
          item.carbohydrates < 0 ? 0 : item.carbohydrates
        ),
        svg: { stroke: colors[0] },
      },
      {
        data: this.props.data.nutrition.map((item) =>
          item.fat < 0 ? 0 : item.fat
        ),
        svg: { stroke: colors[1] },
      },
      {
        data: this.props.data.nutrition.map((item) =>
          item.protein < 0 ? 0 : item.protein
        ),
        svg: { stroke: colors[2] },
      },
    ];

    return (
      <View>
        <LineChart
          style={local.chart}
          data={data}
          contentInset={{ top: 10, bottom: 10 }}
        >
          <Grid />
        </LineChart>
      </View>
    );
  }

  render() {
    if (this.props.title === "Calories") {
      return (
        <View style={local.cardRoot}>
          <View style={local.titleContainer}>
            <Text style={local.defaultText}>Weekly Calories</Text>
          </View>
          <View style={local.chartContainer}>{this.getCaloriesChart()}</View>
        </View>
      );
    } else if (this.props.title === "Nutrition") {
      return (
        <View style={local.cardRoot}>
          <View style={local.titleContainer}>
            <Text style={local.defaultText}>Weekly Nutrition</Text>
          </View>
          <View style={local.chartContainer}>{this.getNutritionChart()}</View>
        </View>
      );
    }
  }
}

const local = StyleSheet.create({
  cardRoot: {
    flexDirection: "column",
    width: 365,
    height: "100%",
    marginLeft: 5,
    marginRight: 5,
    borderColor: "#aaaaaa",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#aaaaaa",
  },

  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },

  chartContainer: {
    flex: 10,
    width: "100%",
    height: "100%",
  },

  chart: {
    alignSelf: "center",
    width: "95%",
    height: "100%",
  },

  defaultText: {
    marginTop: 5,
    color: "#222831",
    fontSize: 18,
  },
});

export default WeeklyLinearChart;
