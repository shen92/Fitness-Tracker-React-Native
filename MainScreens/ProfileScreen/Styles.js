import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionRoot: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#eeeeee",
  },

  sectionHead: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },

  sectionHeadText: {
    fontFamily: "Copperplate",
    fontSize: 25,
    marginTop: 5,
    marginBottom: 5,
    color: "#222831",
  },

  sectionBody: {
    flex: 18,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },

  sectionBody2: {
    flex: 20,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },

  sectionBodyScrollContainer: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },

  sectionBodyScrollView: {
    width: "100%",
  },

  sectionBottom: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
});
