import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import EditFoodModal from "./EditFoodModal/EditFoodModal";

class FoodsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditFoodModal: false
        }
    }

    handleButtonPress() {
        this.showEditFoodModal();
    }

    showEditFoodModal() {
        this.setState({showEditFoodModal: true});
    }

    hideEditFoodModal() {
        this.setState({showEditFoodModal: false});
    }

    render() {
        return (
            <View style={local.listItem}>
                <View style={local.listContentContainer}>
                    <Text style={local.listItemName}>
                        {this.props.value.name}
                    </Text>
                    <Text style={local.listItemContent}>
                        Calories: {this.props.value.calories}
                    </Text>
                    <Text style={local.listItemContent}>
                        Protein: {this.props.value.protein}
                    </Text>
                    <Text style={local.listItemContent}>
                        Carbohydrates: {this.props.value.carbohydrates}
                    </Text>
                    <Text style={local.listItemContent}>
                        Fat: {this.props.value.fat}
                    </Text>
                </View>
                <View style={local.buttonContainer}>
                    <Button
                        title={"View/Edit"}
                        onPress={() => this.handleButtonPress()}
                    />
                    <EditFoodModal
                        value={this.props.value}
                        data2={this.props.data2}
                        showEditFoodModal={this.state.showEditFoodModal}
                        hideEditFoodModal={() => this.hideEditFoodModal()}
                        setNewFood={(field, input) => this.props.setNewFood(field, input)}
                        removeFoodData={(id) => this.props.removeFoodData(id)}
                        putFoodData={(id) => this.props.putFoodData(id)}
                    />
                </View>
            </View>

        );
    }
}

const local = StyleSheet.create({
    listItem: {
        flex: 1,
        width: '100%',
        height: 160,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#aaaaaa',
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

    modal: {
        width: 400,
        height: 400,
    }
});

export default FoodsListItem;