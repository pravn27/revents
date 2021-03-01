import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import cuid from "cuid";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import { createEvent, deleteEvent, updateEvent } from "../eventActions";

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true, selectedEvent: null });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.props.createEvent(newEvent);
    this.setState({ isOpen: false });
  };

  handleEditEvent = (eventToUpdate) => () => {
    this.setState({
      selectedEvent: eventToUpdate,
      isOpen: true,
    });
  };

  handleUpdatedEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null,
    });
  };

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { selectedEvent } = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            onEventEdit={this.handleEditEvent}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content="Create Event"
            onClick={this.handleFormOpen}
          />
          {this.state.isOpen && (
            <EventForm
              selectedEvent={selectedEvent}
              handleUpdate={this.handleUpdatedEvent}
              handleCreate={this.handleCreateEvent}
              handleClose={this.handleFormClose}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.events,
});

const actions = {
  createEvent,
  deleteEvent,
  updateEvent,
};

export default connect(mapStateToProps, actions)(EventDashboard);
