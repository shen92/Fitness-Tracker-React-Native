import React, { Component } from "react";
import ActivitiesListItem from "./ActivitiesListItem";
import { StyleSheet, Text, View, Button } from "react-native";

class ActivitiesList extends Component {
  constructor(props) {
    super(props);
  }

  getActivities() {
    let activities = [];
    if (this.props.data.activities != null) {
      for (const activity of Object.entries(this.props.data.activities)) {
        activities.push(
          <ActivitiesListItem
            key={activity[1].id}
            value={activity[1]}
            data={this.props.data}
            removeActivityData={(id) => this.props.removeActivityData(id)}
            putActivityData={(id) => this.props.putActivityData(id)}
            setNewActivity={(field, input) =>
              this.props.setNewActivity(field, input)
            }
          />
        );
      }
    }
    if (activities.length === 0) {
      return (
        <React.Fragment>
          <Text style={local.text}>You do not have any exercises.</Text>
          <Text style={local.text}>Go to do some exercise!</Text>
        </React.Fragment>
      );
    }
    return activities;
  }

  render() {
    return <React.Fragment>{this.getActivities()}</React.Fragment>;
  }
}

const local = StyleSheet.create({
  text: {
    alignSelf: "center",
    margin: 10,
  },
});

export default ActivitiesList;
