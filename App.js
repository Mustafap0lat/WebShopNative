import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from './Navigation';


export default function App() {

  const Stack = createNativeStackNavigator();

    return (
      <Navigation />
  );
}


