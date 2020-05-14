import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  DownCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone
} from "@ant-design/icons";

import { deleteContact } from "../../actions/contactActions";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  onDeleteClick = id => {
    this.props.deleteContact(id);
  };

  render() {
    const { _id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h4>
          {name}{" "}
          <i onClick={this.onShowClick} style={{ cursor: "pointer" }}>
            <DownCircleTwoTone twoToneColor="#ff0000" />
          </i>
          <i
            onClick={this.onDeleteClick.bind(this, _id)}
            style={{ cursor: "pointer", float: "right", color: "red" }}
          >
            <DeleteTwoTone twoToneColor="#ff0000" />
          </i>
          <Link to={`contact/edit/${_id}`}>
            <i
              style={{
                cursor: "pointer",
                float: "right",
                color: "black",
                marginRight: "1rem"
              }}
            >
              <EditTwoTone twoToneColor="#ff0000" />
            </i>
          </Link>
        </h4>
        {showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteContact }
)(Contact);
