import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class ResultView extends Component {
  
  computeAccuracy = () => {
    const {
      result: { correctAswer },
      result: { incorrectAswer },
    } = this.props;

    const total = correctAswer + incorrectAswer;
    if (total === 0) return 0;
    return (correctAswer * 100.0) / total;
  };

  render() {
    const {
      result: { correctAswer },
      deck,
      onRestartQuiz,
      onBackToDeck,
      newNotificationSchedule,
    } = this.props;

    newNotificationSchedule();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Quiz Result!</Text>
          <View style={styles.containerResult}>
            <View style={styles.direction}>
              <Text style={styles.correctAswerText}>correctAswer: </Text>
              <Text style={styles.correctAswerNumber}>{correctAswer}</Text>
            </View>
            <View style={styles.direction}>
              <Text style={styles.correctAswerText}>Total: </Text>
              <Text style={styles.correctAswerNumber}>
                {Object.keys(deck.flashcards).length}
              </Text>
            </View>
            <View style={styles.direction}>
              <Text style={styles.correctAswerText}>Accuracy:</Text>
              <Text style={styles.correctAswerNumber}>
                {this.computeAccuracy().toFixed(1)}%
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 30 }}>
            <TouchableOpacity onPress={onRestartQuiz}>
              <View
                style={[styles.containerButton, { backgroundColor: "#28a745" }]}
              >
                <Text style={styles.button}>Restart Quiz</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onBackToDeck}>
              <View style={[styles.containerButton]}>
                <Text style={styles.button}>Back to Deck</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  headerText: { textAlign: "center", fontSize: 24, marginBottom: 20 },
  containerResult: {
    borderRadius: 10,
    backgroundColor: "black",
    padding: 20,
    marginHorizontal: 30,
  },
  correctAswerText: {
    flex: 1,
    marginVertical: 8,
    fontSize: 20,
    color: "white",
  },
  correctAswerNumber: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 5,
    fontSize: 20,
    color: "white",
    textAlign: "right",
    fontWeight: "bold",
  },
  containerButton: {
    minWidth: "50%",
    marginVertical: 10,
    backgroundColor: "#6c757d",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  direction: { flexDirection: "row" },
});

export default ResultView;
