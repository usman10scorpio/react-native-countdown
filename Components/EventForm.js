import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatDate, saveEvent} from '../API/api';

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  borderTop: {
    borderColor: '#edeeef',
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

class EventForm extends Component {
  state = {
    title: null,
    date: '',
  };

  handleChangeTitle = (text) => {
    this.setState({
      title: text,
    });
  };

  handleDatePicked = (date) => {
    this.setState({
      date,
    });

    this.handleDatePickerHide();
  };

  handleDatePickerHide = () => {
    this.setState({
      showDatePicker: false,
    });
  };

  handleDatePress = () => {
    this.setState({
      showDatePicker: true,
    });
  };

  handleAddPress = () => {
    saveEvent(this.state).then(() => this.props.navigation.goBack());
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            onChangeText={this.handleChangeTitle}
            placeholder="Event title"
            spellCheck={false}
            value={this.state.title}
          />
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder="Event date"
            spellCheck={false}
            value={formatDate(this.state.date.toString())}
            editable={!this.state.showDatePicker}
            onFocus={this.handleDatePress}
          />
          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode="datetime"
            onConfirm={this.handleDatePicked}
            onCancel={this.handleDatePickerHide}
          />
        </View>

        <TouchableHighlight onPress={this.handleAddPress} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EventForm;
