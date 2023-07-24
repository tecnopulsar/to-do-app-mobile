import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Notes from "./screens/Notes";
import CreateNotes from "./screens/CreateNotes";
import DetailsNotes from "./screens/DetailsNotes";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{
          title: "Notas",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#8B1874" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Create"
        component={CreateNotes}
        options={{
          title: "Crear Nota",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#8B1874" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsNotes}
        options={{
          title: "Detalles de Nota",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#8B1874" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
