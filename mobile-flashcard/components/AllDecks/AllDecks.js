import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

class AllDecks extends Component {
  render() {
    const { decks } = this.props;
    const allDecks = Object.keys(decks).map((id) => decks[id]);

    if (allDecks.length <= 0) {
      return (
        <View style={styles.containerNoDecks}>
          <Text style={styles.noDecksText}>
            You don't have any decks please create new one{" "}
          </Text>
        </View>
      );
    }
    
    return (
      <FlatList
        style={{ flex: 1 }}
        data={allDecks}
        renderItem={({ item }) => {
          return (
            <View style={styles.containerDecks}>
              <TouchableOpacity
                onPress={() =>{
                  console.log(item);
                  this.props.navigation.navigate("Deck", { deck: item })}
                }
              >
                <View>
                  <Text style={styles.decksTitle}>{item.title}</Text>
                  <Text style={styles.decksLength}>
                    No of cards: {Object.keys(item.flashcards || {}).length}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

function mapStateToProp(state) {
  return state;
}

const styles = StyleSheet.create({
  containerNoDecks: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  noDecksText: { textAlign: "center", fontSize: 20 },
  containerDecks: {
    justifyContent: "center",
    padding: 40,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  decksTitle: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    paddingVertical: 10,
    fontWeight: "bold",
  },
  decksLength: { textAlign: "center", fontSize: 16, color: "darkgray" },
});

export default connect(mapStateToProp)(AllDecks);
