import React, {Component} from 'react';
import {StackedAreaChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {StyleSheet, View, Text} from 'react-native'

class WeeklyLinearChart extends Component {

    getCaloriesChart() {
        const colors = ['#9852f9', '#c299fc'];
        const keys = ['calories', 'activity'];

        return (
            <View>
                <StackedAreaChart
                    style={local.chart}
                    contentInset={{top: 10, bottom: 10}}
                    data={this.props.data.calories}
                    keys={keys}
                    colors={colors}
                    curve={shape.curveNatural}
                >
                </StackedAreaChart>
            </View>
        );
    }

    getNutritionChart() {
        const colors = ['#3c9d9b', '#00adb5', '#52de97']
        const keys = ['protein', 'carbohydrates', 'fat']

        return (
            <View>
                <StackedAreaChart
                    style={local.chart}
                    contentInset={{top: 10, bottom: 10}}
                    data={this.props.data.nutrition}
                    keys={keys}
                    colors={colors}
                    curve={shape.curveNatural}
                >
                </StackedAreaChart>
            </View>
        );
    }

    render() {
        if (this.props.title === 'Calories') {
            return (
                <View style={local.cardRoot}>
                    <View style={local.titleContainer}>
                        <Text style={local.defaultText}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={local.chartContainer}>
                        {this.getCaloriesChart()}
                    </View>
                </View>
            );
        } else if (this.props.title === 'Nutrition') {
            return (
                <View style={local.cardRoot}>
                    <View style={local.titleContainer}>
                        <Text style={local.defaultText}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={local.chartContainer}>
                        {this.getNutritionChart()}
                    </View>
                </View>
            );
        }

    }
}

const local = StyleSheet.create({
    cardRoot: {
        flexDirection: 'column',
        width: 365,
        height: '100%',
        marginLeft: 5,
        marginRight: 5,
        borderColor: '#aaaaaa',
        alignItems: 'center',
    },

    titleContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    chartContainer: {
        flex: 10,
        width: '100%',
        height: '100%'
    },

    chart: {
        width: '98%',
        height: '95%'
    },

    defaultText: {
        color: '#222831',
        fontSize: 20
    }
});

export default WeeklyLinearChart;