import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class Question extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
    };
  }

  render() {
    const {
      deck,
      onIncorrectAnswer,
      onCorrectAnswer,
      nextQuestion,
      setShowAnswer,
      showAnswer
    } = this.props;
    const flashcardIds = Object.keys(deck.flashcards);
    const flashcard = deck.flashcards[flashcardIds[nextQuestion]];
    return (
      <View style={styles.container}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalQuestion}>
            progress {nextQuestion + 1} of {flashcardIds.length}
          </Text>
          {showAnswer ? (
            <View>
              <Text style={styles.questionAnswer}>
                {showAnswer ? `Answer: ${flashcard.answer}` : " "}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.questionAnswer}>
                Question: {flashcard.question}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={()=>setShowAnswer()}
          >
            <View style={styles.showAnswerContainer}>
              <Text style={styles.showAnswer}>
                {showAnswer ? "Show Question" : "Show Answer"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.allButton}>
          <TouchableOpacity onPress={onCorrectAnswer}>
            <View
              style={[
                styles.containerButton,
                {
                  backgroundColor: "#28a745",
                },
              ]}
            >
              <Text style={styles.button}>correct</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onIncorrectAnswer}>
            <View style={styles.containerButton}>
              <Text style={styles.button}>Incorrect</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  totalContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },
  totalQuestion: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    color: "darkslategray",
  },

  questionAnswer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 26,
    color: "black",
  },
  showAnswerContainer: {
    marginVertical: 20,
    marginHorizontal: 100,
    backgroundColor: "black",
    padding: 10,
  },
  showAnswer: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  allButton: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 50,
    paddingVertical: 100,
  },
  containerButton: {
    minWidth: "50%",
    marginVertical: 10,
    backgroundColor: "#CC0000",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Question;
