import React, { Component } from "react";
import { Button, Modal, Text, StyleSheet, View } from "react-native";
import EditActivityInputArea from "./EditActivityInputArea";

class EditActivityModal extends Component {
  getContent() {
    return (
      <React.Fragment>
        <View style={local.modalHead}>
          <Text style={local.modalTitle}>Edit Activity</Text>
        </View>
        <View style={local.modalBody}>
          <EditActivityInputArea
            data={this.props.data}
            value={this.props.value}
            removeActivityData={(id) => this.props.removeActivityData(id)}
            putActivityData={(id) => this.props.putActivityData(id)}
            setNewActivity={(field, input) =>
              this.props.setNewActivity(field, input)
            }
            hideModal={() => this.props.hideModal()}
          />
        </View>
        <View style={local.modalBottom}>
          <Button title={"cancel"} onPress={() => this.props.hideModal()} />
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
          visible={this.props.showModal}
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

export default EditActivityModal;
