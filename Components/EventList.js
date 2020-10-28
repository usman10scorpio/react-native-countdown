import React, {Component} from 'react';
import {Text, FlatList} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';

class EventList extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        events: this.state.events.map((evt) => ({
          ...evt,
          timer: Date.now(),
        })),
      });
    }, 1000);

    const events = require('../db.json').events.map((e) => ({
      ...e,
      date: new Date(e.date),
    }));
    this.setState({events});
  }

  handleEvent = () => {
    this.props.navigation.navigate('Form');
  };

  render() {
    const {events} = this.state;
    return (
      <>
        <FlatList
          data={events}
          renderItem={({item}) => <EventCard event={item} />}
          keyExtractor={(item) => item.id}
        />
        <ActionButton key="fab" onPress={this.handleEvent} buttonColor="red" />
      </>
    );
  }
}

export default EventList;
