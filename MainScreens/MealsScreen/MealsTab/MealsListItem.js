import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from "react-native";
import EditMealModal from "./EditMealModal/EditMealModal";

class MealsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditMealModal: false
        }
    }

    handleButtonPress() {
        this.showEditMealModal();
    }

    showEditMealModal() {
        this.setState({showEditMealModal: true});
    }

    hideEditMealModal() {
        this.setState({showEditMealModal: false});
    }

    getDate(date) {
        let mealDate = date.split(/\D+/);
        return (mealDate[0] + '-' + mealDate[1] + '-' + mealDate[2]);
    }

    render() {
        return (
            <View style={local.listItem}>
                <View style={local.listContentContainer}>
                    <Text style={local.listItemName}>
                        {this.props.value.name}
                    </Text>
                    <Text style={local.listItemContent}>
                        {this.getDate(this.props.value.date)}
                    </Text>
                    <Text style={local.listItemContent}>
                        {' '}
                    </Text>
                </View>
                <View style={local.buttonContainer}>
                    <Button
                        title={"View/Edit"}
                        onPress={() => this.handleButtonPress()}
                    />
                    <EditMealModal
                        data={this.props.data}
                        value={this.props.value}
                        style={{backgroundColor: '#eeeeee'}}
                        showEditMealModal={this.state.showEditMealModal}
                        hideEditMealModal={() => this.hideEditMealModal()}
                        removeMealData={(id) => this.props.removeMealData(id)}
                        putMealData={(id) => this.props.putMealData(id)}
                        setNewMeal={(field, input) => this.props.setNewMeal(field, input)}
                    />
                </View>
            </View>

        );
    }
}

const local = StyleSheet.create({
    listItem: {
        flex: 1,
        width: '98%',
        height: 120,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#aaaaaa',
        backgroundColor: 'white',
        margin: 2
    },

    listContentContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },

    listItemName: {
        fontSize: 20,
        marginBottom: 5
    },

    listItemContent: {
        fontSize: 15,
    },

    buttonContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 5
    },
});

export default MealsListItem;