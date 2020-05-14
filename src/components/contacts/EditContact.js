import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getContact, updateContact } from "../../actions/contactActions";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.contact;
    this.setState({
      name,
      email,
      phone
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

  onSubmit = async e => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (isNaN(phone) || phone === "") {
      this.setState({ errors: { phone: "Enter a valid phone no." } });
      return;
    }
    const { id } = this.props.match.params;

    const newContact = {
      name,
      email,
      phone
    };

    // Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: ""
    });
    this.props.updateContact(newContact, id);
    setTimeout(() => {
      this.props.history.push("/");
    }, 200);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    if (name) {
      return (
        <div className="card mb-3">
          <div className="card-header bg-dark text-white">Edit Contact</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextInputGroup
                label="Name"
                name="name"
                placeholder="Enter Name..."
                value={name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextInputGroup
                label="Email"
                name="email"
                type="email"
                placeholder="Enter Email..."
                value={email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextInputGroup
                label="Phone"
                name="phone"
                // type="number"
                placeholder="Enter Phone..."
                value={phone}
                onChange={this.onChange}
                error={errors.phone}
              />
              <input
                type="submit"
                value="Edit Contact"
                className="btn btn-block"
              />
            </form>
          </div>
        </div>
      );
    } else {
      return <h3>Loading...</h3>;
    }
  }
}

EditContact.propTypes = {
  getContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact);
