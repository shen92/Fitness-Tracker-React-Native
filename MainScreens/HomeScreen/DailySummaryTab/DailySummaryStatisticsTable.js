import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

class DailySummaryStatisticsTable extends Component {
  constructor(props) {
    super(props);
  }

  //flag: column, header, goal, user
  getText(flag, content) {
    if (flag === "column") {
      return <Text style={local.defaultText}>{content}</Text>;
    } else if (flag === "header") {
      return <Text style={local.header}>{content}</Text>;
    } else if (flag === "goal") {
      return <Text style={local.goalDataText}>{"" + content}</Text>;
    } else if (flag === "today") {
      return <Text style={local.todayDataText}>{"" + content}</Text>;
    }
  }

  getStatisticsTable() {
    return (
      <View style={local.statisticsTable}>
        <View style={local.itemColumn}>
          {this.getText("column", " ")}
          {this.getText("column", "Calories (cal)")}
          {this.getText("column", "Activity (cal)")}
          {this.getText("column", "Protein (g)")}
          {this.getText("column", "Carbohydrates (g)")}
          {this.getText("column", "Fat (g)")}
        </View>
        <View style={local.goalColumn}>
          {this.getText("header", "Goal")}
          {this.getText("goal", this.props.data.goalDailyCalories)}
          {this.getText("goal", this.props.data.goalDailyActivity)}
          {this.getText("goal", this.props.data.goalDailyProtein)}
          {this.getText("goal", this.props.data.goalDailyCarbohydrates)}
          {this.getText("goal", this.props.data.goalDailyFat)}
        </View>
        <View style={local.userColumn}>
          {this.getText("header", "Today")}
          {this.getText("today", this.props.data.dailyCalories)}
          {this.getText("today", this.props.data.dailyActivity)}
          {this.getText("today", this.props.data.dailyProtein)}
          {this.getText("today", this.props.data.dailyCarbohydrates)}
          {this.getText("today", this.props.data.dailyFat)}
        </View>
      </View>
    );
  }

  render() {
    return <React.Fragment>{this.getStatisticsTable()}</React.Fragment>;
  }
}

const local = StyleSheet.create({
  statisticsTable: {
    flex: 3,
    flexDirection: "row",
  },

  itemColumn: {
    width: "50%",
  },

  goalColumn: {
    width: "25%",
  },

  userColumn: {
    width: "25%",
  },

  header: {
    fontSize: 20,
    color: "#222831",
    alignSelf: "center",
  },

  goalDataText: {
    fontSize: 20,
    color: "#7b4173",
    alignSelf: "center",
  },

  todayDataText: {
    fontSize: 20,
    color: "#a55194",
    alignSelf: "center",
  },

  defaultText: {
    fontSize: 20,
    color: "#222831",
    alignSelf: "flex-start",
  },
});

export default DailySummaryStatisticsTable;
