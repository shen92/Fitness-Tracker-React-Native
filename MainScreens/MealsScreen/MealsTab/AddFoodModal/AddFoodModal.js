import React, { Component } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import AddFoodInputArea from "./AddFoodInputArea";

class AddFoodModal extends Component {
  getContent() {
    return (
      <React.Fragment>
        <View style={local.modalHead}>
          <Text style={local.modalTitle}>New Food</Text>
        </View>
        <View style={local.modalBody}>
          <AddFoodInputArea
            data={this.props.data}
            data2={this.props.data2}
            hideAddFoodModal={() => this.props.hideAddFoodModal()}
            pushFoodData={() => this.props.pushFoodData()}
            setNewFood={(field, input) => this.props.setNewFood(field, input)}
          />
        </View>
        <View style={local.modalBottom}>
          <Button
            title={"Cancel"}
            onPress={() => this.props.hideAddFoodModal()}
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
          visible={this.props.showAddFoodModal}
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

export default AddFoodModal;
