import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import FoodsListItem from "./FoodsListItem";

class FoodsList extends Component {
  constructor(props) {
    super(props);
  }

  getFoods() {
    let foods = [];
    if (this.props.data2.foods != null) {
      for (const food of Object.entries(this.props.data2.foods)) {
        foods.push(
          <FoodsListItem
            key={food[1].id}
            value={food[1]}
            data2={this.props.data2}
            setNewFood={(field, input) => this.props.setNewFood(field, input)}
            removeFoodData={(id) => this.props.removeFoodData(id)}
            putFoodData={(id) => this.props.putFoodData(id)}
          />
        );
      }
    }
    if (foods.length === 0) {
      return (
        <React.Fragment>
          <Text style={local.text}>You do not have any food in this meal.</Text>
        </React.Fragment>
      );
    }
    return foods;
  }

  render() {
    return <React.Fragment>{this.getFoods()}</React.Fragment>;
  }
}

const local = StyleSheet.create({
  text: {
    alignSelf: "center",
    margin: 10,
  },
});

export default FoodsList;
