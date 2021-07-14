import React, {Component} from 'react';
import {styles} from "../Styles";
import {AsyncStorage, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import DailyCardList from "./DailyCardList";
import WeeklyLinearChartList from "./WeeklyLinearChartList";

class WeeklySummaryTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            //authentication
            username: '',
            token: '',
            //screen fields
            date: new Date(),
            //SEVER Data
            activities: [], //sever activities
            rawMeals: [], //sever meals
            meals: [],
            //LOCAL Data
            /*
            * week[0~6]
            * week[i][0]: activity[] => []
            * week[i][1]: meals[] => []
            * */
            week: []

        }
    }

    //Initialization functions
    componentDidMount() {
        this.getUser().then(() => this.updateScreen());
        this.focusListener = this.props.navigation.addListener('didFocus',
            () => this.updateScreen()
        );
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    async getUser() {
        try {
            let token = await AsyncStorage.getItem('token');
            this.setState({token: token});
            let username = await AsyncStorage.getItem('username');
            this.setState({username: username});
        } catch (error) {
            alert(error);
        }
    }

    updateScreen() {
        this.pullActivitiesData();
        this.pullMealsData();
        this.setMealFoods();
        this.updateWeeklyData();
    }

    pullActivitiesData() {
        let requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.token,
                "Authorization": "Basic Og=="
            }),
        };
        let url = "https://mysqlcs639.cs.wisc.edu/activities/"
        fetch(url, requestOptions).then(
            res => res.json()
        ).then(result => {
            this.setActivitiesData(result);
        });
    }

    setActivitiesData(result) {
        this.setState({activities: result.activities});
    }

    pullMealsData() {
        let requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.token,
                "Authorization": "Basic Og=="
            }),
        };
        let url = "https://mysqlcs639.cs.wisc.edu/meals/"
        fetch(url, requestOptions).then(
            res => res.json()
        ).then(result => {
            this.setMealsData(result);
        });
    }

    setMealsData(result) {
        this.setState({rawMeals: result.meals});
    }

    setMealFoods() {
        let meals = [];
        for (let i = 0; i < this.state.rawMeals.length; i++) {
            let meal = [];
            meal.push(this.state.rawMeals[i]);
            meal.push(this.pullFoodData(this.state.rawMeals[i].id));
            meals.push(meal);
        }
        this.setState({meals: meals});
    }

    pullFoodData(id) {
        let foods = [];
        let requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.token,
                "Authorization": "Basic Og=="
            }),
        };
        let url = "https://mysqlcs639.cs.wisc.edu/meals/" + id + "/foods"
        fetch(url, requestOptions).then(
            res => res.json()
        ).then(result => {
            for (const food of Object.values(result.foods)) {
                foods.push(food);
            }
        });
        return foods;
    }

    //Component structure functions
    onRefresh() {
        this.updateScreen();
        this.setState({refresh: false});
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
                    <ScrollView style={styles.sectionBodyScrollView}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refresh}
                                                    onRefresh={() => this.onRefresh()}/>}>
                        <React.Fragment>
                            <View style={local.cardListContainer}>
                                <SafeAreaView style={local.listScrollViewContainer}>
                                    <ScrollView style={local.listScrollView} horizontal={true}>
                                        <DailyCardList data={this.state}/>
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
                            <View style={local.chartListContainer}>
                                <SafeAreaView style={local.listScrollViewContainer}>
                                    <ScrollView style={local.listScrollView} horizontal={true}>
                                        <WeeklyLinearChartList data={this.state}/>
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
                        </React.Fragment>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }

    //Component functions
    updateWeeklyData() {
        let week = [];
        for (let i = 6; i >= 0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            let day = [];
            day.push(date);
            let activities = [];
            for (const activity of Object.values(this.state.activities)) {
                if (this.isActivityToday(date, activity)) {
                    activities.push(activity);
                }
            }
            day.push(activities);
            let meals = [];
            for (const meal of Object.values(this.state.meals)) {
                if (this.isMealToday(date, meal[0])) {
                    meals.push(meal);
                }
            }
            day.push(meals);
            week.push(day);
        }
        this.setState({week: week});
    }

    isActivityToday(date, activity) {
        let activityDate = activity.date.split(/\D+/);
        let ISODate = date.toISOString();
        let curr = ISODate.split(/\D+/);
        if (activityDate[0] === curr[0] && activityDate[1] === curr[1] && activityDate[2] === curr[2]) {
            return true;
        } else {
            return false;
        }
    }

    isMealToday(date, meal) {
        let mealDate = meal.date.split(/\D+/);
        let ISODate = date.toISOString();
        let curr = ISODate.split(/\D+/);
        if (mealDate[0] === curr[0] && mealDate[1] === curr[1] && mealDate[2] === curr[2]) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <View style={styles.sectionRoot}>
                {this.getSectionHead("Weekly Summary")}
                {this.getSectionBody()}
            </View>
        );
    }
}

const local = StyleSheet.create({
    cardListContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 240,
        marginBottom: 20
    },

    chartListContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 280,
    },

    listScrollViewContainer: {
        height: '100%',
    },

    listScrollView: {
        height: '100%',
    },
});

export default WeeklySummaryTab;