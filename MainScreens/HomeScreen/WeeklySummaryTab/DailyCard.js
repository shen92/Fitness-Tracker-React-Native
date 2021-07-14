import React, {Component} from 'react';
import {StyleSheet, View, Text} from "react-native";

class DailyCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dailyCalories: 0.0,
            dailyActivity: 0.0,
            dailyProtein: 0.0,
            dailyCarbohydrates: 0.0,
            dailyFat: 0.0,
        }
    }

    componentWillReceiveProps() {
        this.updateCard();
    }

    updateCard() {
        //console.log(this.props.data);
        let dailyCalories = 0;
        let dailyActivity = 0;
        let dailyProtein = 0;
        let dailyCarbohydrates = 0;
        let dailyFat = 0;
        let activities = this.props.data[1];
        for (const activity of Object.values(activities)) {
            dailyCalories -= activity.calories;
            dailyActivity += activity.calories;
        }
        let meals = this.props.data[2];
        for (const meal of Object.values(meals)) {
            for (const food of Object.values(meal[1])) {
                dailyCalories += food.calories;
                dailyProtein += food.protein;
                dailyCarbohydrates += food.carbohydrates;
                dailyFat += food.fat;
            }
        }
        this.setState({dailyCalories: dailyCalories});
        this.setState({dailyActivity: dailyActivity});
        this.setState({dailyProtein: dailyProtein});
        this.setState({dailyCarbohydrates: dailyCarbohydrates});
        this.setState({dailyFat: dailyFat});
    }

    getDate(date) {
        return (
            <Text style={local.dateText}>
                {date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()}
            </Text>
        );
    }

    getText(text) {
        return (
            <Text style={local.defaultText}>
                {text}
            </Text>
        );
    }

    getDataArea() {
        return (
            <View style={local.dataArea}>
                <View style={local.itemColumn}>
                    <Text style={local.caloriesText}>Calories (cal):</Text>
                    <Text style={local.activityText}>Activity (cal):</Text>
                    <Text style={local.proteinText}>Protein (g):</Text>
                    <Text style={local.carbohydratesText}>Carbohydrates (g):</Text>
                    <Text style={local.fatText}>Fat (g):</Text>
                </View>
                <View style={local.dataColumn}>
                    {this.getText(this.state.dailyCalories)}
                    {this.getText(this.state.dailyActivity)}
                    {this.getText(this.state.dailyProtein)}
                    {this.getText(this.state.dailyCarbohydrates)}
                    {this.getText(this.state.dailyFat)}
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={local.cardRoot}>
                <View style={local.cardLeft}>

                </View>
                <View style={local.cardCenter}>
                    {this.getDate(this.props.date)}
                    {this.getDataArea()}
                </View>
                <View style={local.cardRight}>

                </View>
            </View>
        );
    }
}

const local = StyleSheet.create({
    cardRoot: {
        flexDirection: 'row',
        width: 365,
        height: '100%',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#aaaaaa',
        backgroundColor: 'white',
    },

    cardLeft: {
        flex: 1
    },

    cardCenter: {
        flex: 14,
    },

    cardRight: {
        flex: 1
    },

    dataArea: {
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    },

    itemColumn: {
        flex: 3,
        alignItems: 'flex-start',
    },

    dataColumn: {
        flex: 1,
        alignItems: 'flex-start',
    },

    dateText: {
        color: '#222831',
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 15,
    },

    defaultText: {
        color: '#222831',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
    },

    caloriesText: {
        color: '#9852f9',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
    },

    activityText: {
        color: '#c299fc',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
    },

    proteinText: {
        color: '#3c9d9b',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
    },

    carbohydratesText: {
        color: '#00adb5',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
    },

    fatText: {
        color: '#52de97',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
    },

});

export default DailyCard;