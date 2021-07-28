import React from "react";
import { StackedBarChart, BarChart, Grid } from "react-native-svg-charts";
import { StyleSheet, View } from "react-native";
import XAxis from "react-native-svg-charts/src/x-axis";

class DailySummaryStackChart extends React.PureComponent {
  getChart(data) {
    const colors = ["#7b4173", "#a55194"];

    const barData = [
      {
        data: data.map((item) => {
          return {
            value:
              item.goal <= 0
                ? 0
                : item.label === "Calories"
                ? item.goal / 10
                : item.goal,
          };
        }),
        svg: {
          fill: colors[0],
        },
      },
      {
        data: data.map((item) => {
          return {
            value:
              item.daily <= 0
                ? 0
                : item.label === "Calories"
                ? item.daily / 10
                : item.daily,
          };
        }),
        svg: {
          fill: colors[1],
        },
      },
    ];
    return (
      <React.Fragment>
        <BarChart
          style={local.chart}
          data={barData}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 40, bottom: 40 }}
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
    const chartData = [...chartCalories, ...chartNutrition];
    if (chartCalories !== null && chartNutrition !== null)
      return (
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={local.chartContainer}>
            <View style={local.caloriesContainer}>
              {this.getChart(chartData)}
            </View>
          </View>
        </View>
      );
  }
}

const local = StyleSheet.create({
  chartContainer: {
    flexDirection: "row",
    height: 250,
    width: "95%",
    alignItems: "flex-start",
  },

  caloriesContainer: {
    flex: 1,
  },

  chart: {
    width: "100%",
    height: "100%",
  },

  axis: {
    marginTop: -10,
    height: 40,
    width: "100%",
  },
});

export default DailySummaryStackChart;
