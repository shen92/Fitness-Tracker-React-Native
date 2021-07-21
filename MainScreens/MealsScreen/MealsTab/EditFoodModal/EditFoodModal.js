import React, { Component } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import EditFoodInputArea from "./EditFoodInputArea";
import FoodsListItem from "../FoodsListItem";

class EditFoodModal extends Component {
  getContent() {
    return (
      <React.Fragment>
        <View style={local.modalHead}>
          <Text style={local.modalTitle}>Edit Food</Text>
        </View>
        <View style={local.modalBody}>
          <EditFoodInputArea
            value={this.props.value}
            data2={this.props.data2}
            setNewFood={(field, input) => this.props.setNewFood(field, input)}
            removeFoodData={(id) => this.props.removeFoodData(id)}
            putFoodData={(id) => this.props.putFoodData(id)}
            hideEditFoodModal={() => this.props.hideEditFoodModal()}
          />
        </View>
        <View style={local.modalBottom}>
          <Button
            title={"cancel"}
            onPress={() => this.props.hideEditFoodModal()}
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
          visible={this.props.showEditFoodModal}
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
    fontFamily: "American Typewriter",
    alignSelf: "center",
    fontSize: 25,
    marginTop: 60,
    marginBottom: 5,
    color: "#222831",
  },
});

export default EditFoodModal;
