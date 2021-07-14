import React, {Component} from 'react';
import MealsListItem from "./MealsListItem";
import {StyleSheet, Text, View} from "react-native";

class MealsList extends Component {
    constructor(props) {
        super(props);
    }

    getMeals() {
        let meals = [];
        if (this.props.data.meals != null) {
            for (const meal of Object.entries(this.props.data.meals)) {
                meals.push(
                    <MealsListItem
                        key={meal[1].id}
                        value={meal[1]}
                        data={this.props.data}
                        removeMealData={(id) => this.props.removeMealData(id)}
                        putMealData={(id) => this.props.putMealData(id)}
                        setNewMeal={(field, input) => this.props.setNewMeal(field, input)}
                    />
                );

            }
        }
        if (meals.length === 0) {
            return (
                <React.Fragment>
                    <Text style={local.text}>
                        You do not have any meals.
                    </Text>
                    <Text style={local.text}>
                        Go to add meals!
                    </Text>
                </React.Fragment>
            );
        }
        return meals;
    }

    render() {
        return (
            <React.Fragment>
                {this.getMeals()}
            </React.Fragment>
        );
    }
}

const local = StyleSheet.create({
    text: {
        alignSelf: 'center',
        margin: 10,
    }
});

export default MealsList;