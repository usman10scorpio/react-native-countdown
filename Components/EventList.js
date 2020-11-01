import React, {Component} from 'react';
import {FlatList} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import {getEvents} from '../API/api';

class EventList extends Component {
  state = {
    events: [],
  };

  tick() {
    this.setState({
      events: this.state.events.map((evt) => ({
        ...evt,
        timer: Date.now(),
      })),
    });
  }

  componentDidMount() {
    setInterval(() => this.tick(), 1000);

    this.props.navigation.addListener('focus', () => {
      getEvents().then((events) => {
        this.setState({events});
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
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
