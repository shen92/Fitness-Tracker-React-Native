import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, SafeAreaView} from "react-native";
import {Button} from "react-native-elements";
import FoodsList from "../FoodsList";
import AddFoodModal from "../AddFoodModal/AddFoodModal";
import EditFoodInputArea from "../EditFoodModal/EditFoodInputArea";

class EditMealInputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddFoodModal: false
        }
    }

    componentDidMount() {
        this.props.setNewMeal('Meal', this.props.value.name);
    }

    getBody() {
        return (
            <View style={local.body}>
                {this.getInput("Meal", this.props.data.name)}
                {this.getFoodListArea()}
                {this.getAddFoodButton()}
            </View>
        );
    }

    //Edit Meal
    getInput(field, initValue) {
        return (
            <View style={local.userInput}>
                <Text style={local.defaultText}>{field}</Text>
                {this.getInputBox(field, initValue)}
            </View>
        );
    }

    getInputBox(field, initValue) {
        return (
            <TextInput
                style={local.userInputBox}
                value={"" + initValue}
                onChangeText={input => this.props.setNewMeal(field, input)}
            />
        );
    }

    getButtonArea() {
        return (
            <View style={local.buttonContainer}>
                <Button
                    buttonStyle={local.deleteButton}
                    titleStyle={local.buttonText}
                    title={"Delete Meal"}
                    onPress={() => this.handleButtonPress('delete')}
                />
                <Button
                    buttonStyle={local.defaultButton}
                    titleStyle={local.buttonText}
                    title={"Save"}
                    onPress={() => this.handleButtonPress('save')}
                />
            </View>
        );
    }

    handleButtonPress(action) {
        if (action === 'save') {
            this.props.putMealData(this.props.value.id);
            this.props.hideEditMealModal();
        } else if (action === 'delete') {
            this.props.removeMealData(this.props.value.id);
        } else if (action === 'add') {
            this.showAddFoodModal();
        }
    }

    //Add/Edit Food
    showAddFoodModal() {
        this.setState({showAddFoodModal: true});
    }

    hideAddFoodModal() {
        this.setState({showAddFoodModal: false});
    }

    getFoodListArea() {
        return (
            <View style={local.foodListContainer}>
                <SafeAreaView style={local.foodListScrollViewContainer}>
                    <ScrollView style={local.foodListScrollView}>
                        <FoodsList
                            data2={this.props.data2}
                            setNewFood={(field, input)=>this.props.setNewFood(field, input)}
                            removeFoodData={(id) => this.props.removeFoodData(id)}
                            putFoodData={(id) => this.props.putFoodData(id)}
                        />
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }

    getAddFoodButton() {
        return (
            <View style={local.addFoodButtonContainer}>
                <Button
                    type="clear"
                    title={"Add Food"}
                    onPress={() => this.handleButtonPress('add')}
                />
                <AddFoodModal
                    data={this.props.data}
                    data2={this.props.data2}
                    style={{backgroundColor: '#eeeeee'}}
                    showAddFoodModal={this.state.showAddFoodModal}
                    hideAddFoodModal={() => this.hideAddFoodModal()}
                    pushFoodData={() => this.props.pushFoodData()}
                    setNewFood={(field, input) => this.props.setNewFood(field, input)}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={local.root}>
                {this.getBody()}
                {this.getButtonArea()}
            </View>
        );
    }
}

const local = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignSelf: 'center',
    },

    body: {
        flex: 4,
    },

    userInput: {
        marginTop: 8,
        alignSelf: 'center'
    },

    userInputBox: {
        height: 45,
        width: 300,
        marginTop: 2,
        marginBottom: 8,
        borderColor: '#222831',
        borderWidth: 1,
        fontSize: 18,
        color: '#222831'
    },

    foodListContainer: {
        height: 340,
    },

    foodListScrollViewContainer: {
        height: '100%',
        width: '100%',
    },

    foodListScrollView: {
        height: '100%',
        width: '100%',
    },

    addFoodButtonContainer: {
        flexDirection: 'column',
        margin: 5
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    defaultButton: {
        backgroundColor: '#00adb5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 5,
        margin: 15
    },

    deleteButton: {
        backgroundColor: '#b22222',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 5,
        margin: 15
    },

    buttonText: {
        color: '#eeeeee',
        fontSize: 15
    },

    defaultText: {
        color: '#222831',
        fontSize: 20
    },
});

export default EditMealInputArea;