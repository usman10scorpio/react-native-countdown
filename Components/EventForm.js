import React, {Component} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

class EventForm extends Component {
  state = {
    events: [],
  };

  handlePress = () => {
    this.props.navigation.navigate('List');
  };

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.handlePress}>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EventForm;
