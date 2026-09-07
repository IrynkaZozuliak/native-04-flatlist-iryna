import React from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { playSound } from "../services/soundHandler";

const AllWords = ({ switchScreen, words, setWords }) => {
  const deleteWord = (wordToDelete) => {
    if (!setWords) return;

    setWords((currentWords) =>
      currentWords.filter((item) => item.word !== wordToDelete)
    );
  };

  const handlePlay = (audio) => {
    if (audio) {
      playSound(audio);
    }
  };

  const renderWord = ({ item }) => (
    <View style={styles.wordContainer}>
      <View style={styles.wordInfo}>
        <Text style={styles.word}>{item.word}</Text>

        <Text style={styles.phonetic}>
          {item.phonetics || item.phonetic || ""}
        </Text>

        {item.partOfSpeech && (
          <Text style={styles.partOfSpeech}>
            {item.partOfSpeech}
          </Text>
        )}

        <Text style={styles.meaning}>
          {item.meaning}
        </Text>
      </View>

      <View style={styles.buttons}>
        {/* PLAY — завжди показуємо кнопку */}
        <Pressable onPress={() => handlePlay(item.audio)}>
          <Ionicons
            name="play-outline"
            size={28}
          />
        </Pressable>

        {/* DELETE */}
        <Pressable onPress={() => deleteWord(item.word)}>
          <Ionicons
            name="trash-outline"
            size={28}
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Words</Text>

        <Pressable onPress={() => switchScreen("addWord")}>
          <Ionicons
            name="add-outline"
            size={32}
          />
        </Pressable>
      </View>

      <FlatList
        data={words}
        renderItem={renderWord}
        keyExtractor={(item, index) =>
          `${item.word}-${index}`
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            No words yet
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  wordContainer: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  wordInfo: {
    flex: 1,
  },

  word: {
    fontSize: 20,
    fontWeight: "bold",
  },

  phonetic: {
    marginTop: 4,
    fontSize: 16,
  },

  partOfSpeech: {
    marginTop: 4,
    fontStyle: "italic",
  },

  meaning: {
    marginTop: 8,
    fontSize: 16,
  },

  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 18,
  },
});

export default AllWords;