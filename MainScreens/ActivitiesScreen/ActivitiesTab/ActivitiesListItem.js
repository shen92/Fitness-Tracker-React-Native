import React, { Component } from "react";
import { Button, StyleSheet, Text, View, Modal } from "react-native";
import EditActivityModal from "./EditActivityModal/EditActivityModal";

class ActivitiesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleButtonPress() {
    this.showModal();
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <View style={local.listItem}>
        <View style={local.listContentContainer}>
          <Text style={local.listItemName}>{this.props.value.name}</Text>
          <Text style={local.listItemContent}>
            Time: {this.props.value.duration} min
          </Text>
          <Text style={local.listItemContent}>
            Calories: {this.props.value.calories} cal
          </Text>
        </View>
        <View style={local.buttonContainer}>
          <Button
            title={"View / Edit"}
            onPress={() => this.handleButtonPress()}
          />
          <EditActivityModal
            data={this.props.data}
            value={this.props.value}
            style={{ backgroundColor: "#eeeeee" }}
            showModal={this.state.showModal}
            hideModal={() => this.hideModal()}
            removeActivityData={(id) => this.props.removeActivityData(id)}
            putActivityData={(id) => this.props.putActivityData(id)}
            setNewActivity={(field, input) =>
              this.props.setNewActivity(field, input)
            }
          />
        </View>
      </View>
    );
  }
}

const local = StyleSheet.create({
  listItem: {
    flex: 1,
    width: "98%",
    height: 120,
    alignSelf: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#aaaaaa",
    backgroundColor: "white",
    margin: 2,
  },

  listContentContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },

  listItemName: {
    fontSize: 20,
    marginBottom: 5,
  },

  listItemContent: {
    fontSize: 15,
  },

  buttonContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 5,
  },

  modal: {
    width: 400,
    height: 400,
  },
});

export default ActivitiesListItem;
