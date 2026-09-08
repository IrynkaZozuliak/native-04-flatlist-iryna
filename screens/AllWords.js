import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { playSound } from "../services/soundHandler";

const AllWords = ({ switchScreen, words, setWords }) => {
  const handlePlay = (audio) => {
    if (audio) {
      playSound(audio);
    }
  };

  const handleDelete = (index) => {
    setWords((prevWords) =>
      prevWords.filter((_, wordIndex) => wordIndex !== index)
    );
  };

  const renderWord = ({ item, index }) => {
    return (
      <View style={styles.wordItem}>
        {/* PLAY — завжди показуємо */}
        <Pressable onPress={() => handlePlay(item.audio)}>
          <Ionicons name="play-outline" size={28} />
        </Pressable>

        <View style={styles.wordInfo}>
          <Text style={styles.word}>{item.word}</Text>

          <Text style={styles.meaning}>
            {item.meaning}
          </Text>

          <Text style={styles.phonetic}>
            {item.phonetics || item.phonetic}
          </Text>
        </View>

        {/* DELETE */}
        <Pressable onPress={() => handleDelete(index)}>
          <Ionicons name="trash-outline" size={26} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My dictionary</Text>

        <Pressable
          style={styles.addButton}
          onPress={() => switchScreen("addWord")}
        >
          <Ionicons name="add-outline" size={32} color="white" />
        </Pressable>
      </View>

      <FlatList
        data={words}
        renderItem={renderWord}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No words yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  addButton: {
    position: "absolute",
    right: 20,
    bottom: 10,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
  },

  wordItem: {
    minHeight: 65,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 2,
  },

  wordInfo: {
    flex: 1,
    marginHorizontal: 12,
  },

  word: {
    fontSize: 18,
    fontWeight: "bold",
  },

  meaning: {
    fontSize: 14,
    marginTop: 2,
  },

  phonetic: {
    fontSize: 12,
    color: "#777",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },

  emptyText: {
    fontSize: 24,
    color: "#777",
  },
});

export default AllWords;