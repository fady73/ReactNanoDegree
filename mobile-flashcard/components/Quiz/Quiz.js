import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../../utils/helpers";
import ResultView from "./ResultView/ResultView";
import Question from "./Question/Question";

class Quiz extends Component {
  state = {
    nextQuestion: 0,
    correctAswer: 0,
    incorrectAswer: 0,
    showAnswer: false,
  };

  newNotificationSchedule = () => {
    clearLocalNotification().then(setLocalNotification);
  };

  onCorrectAnswer = () => {
    this.setState((prevState) => ({
      nextQuestion: prevState.nextQuestion + 1,
      correctAswer: prevState.correctAswer + 1,
      showAnswer: false,
    }));
  };

  setShowAnswer=()=>{
    this.setState((prevState) => ({
      showAnswer: !prevState.showAnswer,
    }))
  }

  onIncorrectAnswer = () => {
    this.setState((prevState) => ({
      nextQuestion: prevState.nextQuestion + 1,
      incorrectAswer: prevState.incorrectAswer + 1,
      showAnswer: false,
    }));
  };

  onBackToDeck = () => {
    this.props.navigation.goBack();
  };

  onRestartQuiz = () => {
    this.setState({
      nextQuestion: 0,
      correctAswer: 0,
      incorrectAswer: 0,
      showAnswer: false,
    });
  };

  render() {
    const { deck } = this.props.navigation.state.params;
    const { nextQuestion } = this.state;
    const { incorrectAswer, correctAswer,showAnswer} = this.state;
    const flashcardIds = Object.keys(deck.flashcards);

    if (flashcardIds.length === 0) {
      return (
        <View style={styles.containerNoCard}>
          <Text style={styles.noCardError}>
            You don't have any flashcard please add new card.
          </Text>
        </View>
      );
    }

    if (nextQuestion >= flashcardIds.length) {
      return (
        <ResultView
          deck={deck}
          showAnswer={showAnswer}
          onBackToDeck={this.onBackToDeck}
          onRestartQuiz={this.onRestartQuiz}
          result={{ correctAswer, incorrectAswer }}
          newNotificationSchedule={this.newNotificationSchedule}
        />
      );
    } else {
      return (
        <Question
          deck={deck}
          setShowAnswer={this.setShowAnswer}
          onIncorrectAnswer={this.onIncorrectAnswer}
          onCorrectAnswer={this.onCorrectAnswer}
          nextQuestion={nextQuestion}
          showAnswer={showAnswer}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  containerNoCard: { flex: 1, justifyContent: "center", padding: 20 },
  noCardError: { textAlign: "center", fontSize: 20 },
});

export default Quiz;
