import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../../actions/app";

class SingleDeck extends Component {
  
  onClickModleDelete = () => {
    const {
      deck: { id },
      deleteDick,
    } = this.props;
    deleteDick(id);
    this.props.navigation.navigate("Decks")
  };

  onClickDelete = () => {
    const {
      deck: { title },
    } = this.props;
    Alert.alert(
      "Waring!",
      `Are you sure you want delete deck name : ${title} it will delete all question?`,
      [
        { text: "Yes", onPress: () => this.onClickModleDelete() },
        { text: "No" },
      ],
      { cancelable: true }
    );
  };

  render() {
    const { deck } = this.props;
    if (!deck) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.number}>
            {Object.keys(deck.flashcards).length} Cards in Deck
          </Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("CreateNewCard", { deck: deck })
            }
          >
            <View style={styles.outlineContainer}>
              <Text style={[styles.button, { color: "black" }]}>Add Card</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Quiz", { deck: deck })
            }
          >
            <View style={styles.filledContainer}>
              <Text style={styles.button}>Start Quiz</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onClickDelete}>
            <View
              style={[styles.filledContainer, { backgroundColor: "#CC0000" }]}
            >
              <Text style={styles.button}>Delete Deck</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  containerHeader: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  title: { textAlign: "center", fontSize: 30 },
  number: { marginTop: 10, textAlign: "center", fontSize: 20, color: "black" },
  containerButton: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 50,
  },
  filledContainer: {
    minWidth: "50%",
    marginVertical: 10,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  outlineContainer: {
    minWidth: "50%",
    marginVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});

const mapDispatchToProps = (dispatch) => ({
  deleteDick: (id) => dispatch(handleDeleteDeck(id)),
});

const mapStateToProps = (state, props) => {
  console.log(state.decks)
  return {
    deck: state.decks[props.navigation.state.params.deck.id],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleDeck);
