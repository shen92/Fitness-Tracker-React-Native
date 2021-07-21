import { createStackNavigator } from "react-navigation-stack";
import SignInScreen from "./SignInScreen/SignInScreen";
import SignUpScreen from "./SignUpScreen/SignUpScreen";
import { createAppContainer } from "react-navigation";

const LoginStackNavigator = createStackNavigator(
  {
    signIn: {
      screen: SignInScreen,
    },
    signUp: {
      screen: SignUpScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(LoginStackNavigator);
