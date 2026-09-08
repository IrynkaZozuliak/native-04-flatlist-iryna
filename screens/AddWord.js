import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";

const AddWord = ({ switchScreen, setWords }) => {
  const [inputValue, setInputValue] = useState("");
  const [wordInfo, setWordInfo] = useState(null);

  const requestId = useRef(0);

  useEffect(() => {
    if (!inputValue.trim()) {
      setWordInfo(null);
      return;
    }

    const currentRequestId = ++requestId.current;

    const timer = setTimeout(async () => {
      const result = await getWordInfo(inputValue.trim());

      if (currentRequestId !== requestId.current) {
        return;
      }

      setWordInfo(result);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const handleAdd = () => {
    if (!wordInfo) {
      return;
    }

    setWords((currentWords) => [
      ...currentWords,
      wordInfo,
    ]);

    switchScreen("allWords");
  };

  const handlePlay = () => {
    if (wordInfo?.audio) {
      playSound(wordInfo.audio);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => switchScreen("allWords")}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color="#000"
          />
        </Pressable>

        <Text style={styles.title}>Add word</Text>

        <View style={styles.placeholder} />
      </View>

      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="type here.."
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {wordInfo ? (
        <View style={styles.result}>
          <View style={styles.wordHeader}>
            <Text style={styles.word}>
              {wordInfo.word}
            </Text>

            {wordInfo.audio ? (
              <Pressable
                onPress={handlePlay}
                style={styles.soundButton}
              >
                <Ionicons
                  name="volume-medium-outline"
                  size={28}
                  color="#000"
                />
              </Pressable>
            ) : null}
          </View>

          {wordInfo.phonetics || wordInfo.phonetic ? (
            <Text style={styles.phonetics}>
              {wordInfo.phonetics || wordInfo.phonetic}
            </Text>
          ) : null}

          {wordInfo.partOfSpeech ? (
            <Text style={styles.partOfSpeech}>
              {wordInfo.partOfSpeech}
            </Text>
          ) : null}

          {wordInfo.meaning ? (
            <Text style={styles.meaning}>
              {wordInfo.meaning}
            </Text>
          ) : null}

          <Pressable
            onPress={handleAdd}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      ) : null}
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  placeholder: {
    width: 40,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 18,
  },

  result: {
    marginTop: 30,
  },

  wordHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  word: {
    fontSize: 30,
    fontWeight: "bold",
  },

  soundButton: {
    marginLeft: 15,
    padding: 5,
  },

  phonetics: {
    marginTop: 10,
    fontSize: 18,
    color: "#666",
  },

  partOfSpeech: {
    marginTop: 10,
    fontSize: 18,
    fontStyle: "italic",
  },

  meaning: {
    marginTop: 15,
    fontSize: 18,
    lineHeight: 26,
  },

  addButton: {
    marginTop: 25,
    backgroundColor: "#000",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddWord;