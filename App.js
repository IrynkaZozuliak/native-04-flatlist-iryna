import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";

const App = () => {
  const [words, setWords] = useState([]);
  const [activeScreen, setActiveScreen] = useState("allWords");

  const switchScreen = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <View style={styles.container}>
      {activeScreen === "allWords" ? (
        <AllWords
          switchScreen={switchScreen}
          words={words}
          setWords={setWords}
        />
      ) : (
        <AddWord
          switchScreen={switchScreen}
          setWords={setWords}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;