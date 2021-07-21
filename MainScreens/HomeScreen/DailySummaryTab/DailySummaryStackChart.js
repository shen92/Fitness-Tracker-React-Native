import React from "react";
import { StackedBarChart } from "react-native-svg-charts";
import { StyleSheet, View } from "react-native";
import XAxis from "react-native-svg-charts/src/x-axis";

class DailySummaryStackChart extends React.PureComponent {
  getChart(data) {
    const keys = ["goal", "daily"];
    const colors = ["#7b4173", "#a55194"];
    return (
      <React.Fragment>
        <StackedBarChart
          style={local.chart}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={true}
          contentInset={{ top: 20, bottom: 30 }}
        />
        <XAxis
          style={local.axis}
          data={data}
          formatLabel={(_, index) => data[index].label}
          contentInset={{ left: 40, right: 40 }}
          svg={{ fontSize: 12, fill: "#222831" }}
        />
      </React.Fragment>
    );
  }

  render() {
    let chartCalories = this.props.chartCalories;
    let chartNutrition = this.props.chartNutrition;
    if (chartCalories !== null && chartNutrition !== null)
      return (
        <React.Fragment>
          <View style={local.chartContainer}>
            <View style={local.caloriesContainer}>
              {this.getChart(chartCalories)}
            </View>
            <View style={local.nutritionContainer}>
              {this.getChart(chartNutrition)}
            </View>
          </View>
        </React.Fragment>
      );
  }
}

const local = StyleSheet.create({
  chartContainer: {
    flexDirection: "row",
    height: 250,
    width: "98%",
  },

  caloriesContainer: {
    flex: 2,
  },

  nutritionContainer: {
    flex: 3,
  },

  chart: {
    width: "100%",
    height: "100%",
  },

  axis: {
    marginTop: -15,
    height: 40,
    width: "100%",
  },
});

export default DailySummaryStackChart;
