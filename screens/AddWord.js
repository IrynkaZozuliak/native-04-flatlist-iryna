import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";

const AddWord = ({ switchScreen, setWords }) => {
  const [inputValue, setInputValue] = useState("");
  const [wordInfo, setWordInfo] = useState(null);

  const timerRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!inputValue.trim()) {
      setWordInfo(null);
      return;
    }

    const requestId = ++requestIdRef.current;

    timerRef.current = setTimeout(async () => {
      const result = await getWordInfo(inputValue.trim());

      if (requestId === requestIdRef.current) {
        setWordInfo(result);
      }
    }, 1000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [inputValue]);

  const addWord = () => {
    if (!wordInfo) return;

    setWords((currentWords) => [
      ...currentWords,
      wordInfo,
    ]);

    switchScreen("allWords");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => switchScreen("allWords")}>
          <Ionicons
            name="arrow-back-outline"
            size={30}
          />
        </Pressable>

        <Text style={styles.title}>Add word</Text>
      </View>

      <TextInput
        placeholder="type here.."
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.input}
      />

      {wordInfo && (
        <View style={styles.result}>
          <View style={styles.wordRow}>
            <Text style={styles.word}>
              {wordInfo.word}
            </Text>

            {wordInfo.audio && (
              <Pressable
                onPress={() => playSound(wordInfo.audio)}
              >
                <Ionicons
                  name="volume-medium-outline"
                  size={26}
                />
              </Pressable>
            )}
          </View>

          {wordInfo.phonetics && (
            <Text>{wordInfo.phonetics}</Text>
          )}

          {wordInfo.partOfSpeech && (
            <Text>{wordInfo.partOfSpeech}</Text>
          )}

          {wordInfo.meaning && (
            <Text style={styles.meaning}>
              {wordInfo.meaning}
            </Text>
          )}

          <Pressable
            onPress={addWord}
            style={styles.addButton}
          >
            <Text>Add</Text>
          </Pressable>
        </View>
      )}
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
    gap: 15,
    marginBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
  },

  result: {
    marginTop: 30,
  },

  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  word: {
    fontSize: 28,
    fontWeight: "bold",
  },

  meaning: {
    marginTop: 15,
    fontSize: 17,
  },

  addButton: {
    marginTop: 20,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default AddWord;