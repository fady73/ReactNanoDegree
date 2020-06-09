import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { createNewDeck } from "../../actions/app";

class CreateNewDeck extends Component {
  state = {
    name: "",
  };

 generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

  onClickCreateDick = () => {
    let { name } = this.state;
    const { createDick } = this.props;

    name = name.trim();
    if (!name) {
      alert("Please enter deck title is required");
      return;
    }
    const id=this.generateUID();

    createDick(name,id);
    this.props.navigation.navigate("Deck", { deck:{id:id} })
    this.setState({ name: ""});
  };

  render() {
    const { name } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <Text style={styles.inputHeadingText}>
            What is the title of your new deck?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ name: text })}
            placeholder="Deck title"
            value={name}
          />
          <TouchableOpacity onPress={this.onClickCreateDick}>
            <View style={styles.submit}>
              <Text style={styles.submitText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 50 },
  containerInput: { flex: 1, paddingVertical: 10, justifyContent: "center" },
  inputHeadingText: { textAlign: "center", fontSize: 20, marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: "darkslategray",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  submit: {
    marginVertical: 20,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  submitText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});

const mapDispatchToProps = (dispatch) => ({
  createDick: (name,id) => dispatch(createNewDeck(name,id)),
});

export default connect(null, mapDispatchToProps)(CreateNewDeck);
