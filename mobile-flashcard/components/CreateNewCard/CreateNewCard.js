import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { createNewFlashcard } from "../../actions/app";

class CreateNewCard extends Component {
  state = {
    formValues: {
      question: "",
      answer: "",
    },
  };
  
  onClickCreateCard = () => {
    let {
      formValues: { question, answer },
      formValues,
    } = this.state;

    const {
      navigation: {
        state: {
          params: { deck },
        },
      },
      createFlashcard,
    } = this.props;
    question = question.trim();
    answer = answer.trim();
    if (!question || !answer) {
      alert("Please Enter Question And Answer Are Required");
      return;
    }
    createFlashcard(deck.id, formValues);
    this.props.navigation.goBack();
  };

  render() {
    const { formValues } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 10 }}>
          <TextInput
            style={styles.questionInput}
            placeholder="Enter Question"
            onChangeText={(text) =>
              this.setState({ formValues: { ...formValues, question: text } })
            }
          />
          <TextInput
            style={styles.answerInput}
            placeholder="Enter Answer"
            onChangeText={(text) =>
              this.setState({ formValues: { ...formValues, answer: text } })
            }
          />
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={this.onClickCreateCard}>
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
  questionInput: {
    borderWidth: 1,
    borderColor: "darkslategray",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: "darkslategray",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  containerButton: { flex: 1, justifyContent: "flex-start" },
  submit: {
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
  createFlashcard: (id, formValues) =>
    dispatch(createNewFlashcard(id, formValues)),
});

export default connect(null, mapDispatchToProps)(CreateNewCard);
