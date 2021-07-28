import React, { Component } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import EditMealInputArea from "./EditMealInputArea";
import { Config } from "../../../../Config";

class EditMealModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Component data flow
      foods: [],
      //New Food
      name: "",
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
    };
  }

  componentDidMount() {
    this.pullFoodsData();
  }

  pullFoodsData() {
    let requestOptions = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.props.data.token,
      }),
    };
    const url = `${Config.BASE_URL}/meals/${this.props.value.id}/foods`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        this.setFoodsData(result);
      });
  }

  setFoodsData(result) {
    this.setState({ foods: result.foods });
  }

  pushFoodData() {
    let requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.props.data.token,
      },
      body: JSON.stringify({
        name: this.state.name,
        calories: this.state.calories,
        protein: this.state.protein,
        carbohydrates: this.state.carbohydrates,
        fat: this.state.fat,
      }),
    };
    const url = `${Config.BASE_URL}/meals/${this.props.value.id}/foods`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        this.clearInputArea();
        this.pullFoodsData();
      });
  }

  removeFoodData(id) {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.props.data.token,
      },
    };
    const url = `${Config.BASE_URL}/meals/${this.props.value.id}/foods/${id}`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        this.clearInputArea();
        this.pullFoodsData();
      });
  }

  putFoodData(id) {
    let requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": this.props.data.token,
        Authorization: "Basic Og==",
      },
      body: JSON.stringify({
        name: this.state.name,
        calories: this.state.calories,
        protein: this.state.protein,
        carbohydrates: this.state.carbohydrates,
        fat: this.state.fat,
      }),
    };
    const url = `${Config.BASE_URL}/meals/${this.props.value.id}/foods/${id}`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        this.clearInputArea();
        this.pullFoodsData();
      });
  }

  setNewFood(field, input) {
    if (field === "Food") {
      this.setState({ name: input });
    } else if (field === "Calories (cal)") {
      this.setState({ calories: input });
    } else if (field === "Protein (g)") {
      this.setState({ protein: input });
    } else if (field === "Carbohydrates (g)") {
      this.setState({ carbohydrates: input });
    } else if (field === "Fat (g)") {
      this.setState({ fat: input });
    }
  }

  clearInputArea() {
    this.setState({ name: "" });
    this.setState({ calories: 0 });
    this.setState({ protein: 0 });
    this.setState({ carbohydrates: 0 });
    this.setState({ fat: 0 });
  }

  getContent() {
    return (
      <React.Fragment>
        <View style={local.modalHead}>
          <Text style={local.modalTitle}>Edit Meal</Text>
        </View>
        <View style={local.modalBody}>
          <EditMealInputArea
            data={this.props.data}
            data2={this.state}
            value={this.props.value}
            removeMealData={(id) => this.props.removeMealData(id)}
            putMealData={(id) => this.props.putMealData(id)}
            setNewMeal={(field, input) => this.props.setNewMeal(field, input)}
            setNewFood={(field, input) => this.setNewFood(field, input)}
            pushFoodData={() => this.pushFoodData()}
            removeFoodData={(id) => this.removeFoodData(id)}
            putFoodData={(id) => this.putFoodData(id)}
            hideEditMealModal={() => this.props.hideEditMealModal()}
          />
        </View>
        <View style={local.modalBottom}>
          <Button
            title={"Cancel"}
            onPress={() => this.props.hideEditMealModal()}
          />
        </View>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          visible={this.props.showEditMealModal}
        >
          {this.getContent()}
        </Modal>
      </React.Fragment>
    );
  }
}

const local = StyleSheet.create({
  modalRoot: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  modalHead: {
    flex: 2,
    width: "100%",
  },

  modalBody: {
    flex: 9,
    width: "100%",
  },

  modalBottom: {
    flex: 1,
    width: "100%",
  },

  modalTitle: {
    fontFamily: "Copperplate",
    alignSelf: "center",
    fontSize: 25,
    marginTop: 60,
    marginBottom: 5,
    color: "#222831",
  },
});

export default EditMealModal;
