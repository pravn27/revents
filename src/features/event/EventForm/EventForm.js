import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import cuid from "cuid";
import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

class EventForm extends Component {
  onFormSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  render() {
    return (
      <Grid.Column width={10}>
        <Segment>
          <Header sub color="teal" content="Event Details" />
          <Form onSubmit={this.onFormSubmit}>
            <Field
              name="title"
              type="text"
              component={TextInput}
              placeholder="Give your event a name"
            />
            <Field
              name="category"
              type="text"
              component={SelectInput}
              options={category}
              placeholder="What is your event about"
            />
            <Field
              name="description"
              type="text"
              rows={3}
              component={TextArea}
              placeholder="Tell us about your event"
            />
            <Header sub color="teal" content="Event Location Details" />
            <Field
              name="city"
              type="text"
              component={TextInput}
              placeholder="Event City"
            />
            <Field
              name="venue"
              type="text"
              component={TextInput}
              placeholder="Event Venue"
            />
            <Field
              name="date"
              type="text"
              component={TextInput}
              placeholder="Event Date"
            />
            <Button positive type="submit">
              Submit
            </Button>
            <Button type="button" onClick={this.props.history.goBack}>
              Cancel
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };
  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }
  return {
    event,
  };
};

const actions = {
  createEvent,
  updateEvent,
};

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "eventForm" })(EventForm));
