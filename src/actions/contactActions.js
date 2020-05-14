import {
  GET_CONTACTS,
  DELETE_CONTACT,
  ADD_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT
} from "./type";
import axios from "axios";

export const getContacts = () => async dispatch => {
  const res = await axios.get("http://localhost:3000/contact");
  dispatch({
    type: GET_CONTACTS,
    payload: res.data.contacts
  });
};

export const getContact = id => async dispatch => {
  const res = await axios.get(`http://localhost:3000/contact/${id}`);
  dispatch({
    type: GET_CONTACT,
    payload: res.data.contact
  });
};

export const deleteContact = id => async dispatch => {
  await axios.delete(`http://localhost:3000/contact/${id}`);
  dispatch({
    type: DELETE_CONTACT,
    payload: id
  });
};

export const addContact = contact => async dispatch => {
  const res = await axios.post(`http://localhost:3000/contact`, contact, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  const { name, email, phone } = res.data;
  const id = res.data._id;
  const newContact = {
    id,
    name,
    email,
    phone
  };
  dispatch({
    type: ADD_CONTACT,
    payload: newContact
  });
};

export const updateContact = (contact, id) => async dispatch => {
  const res = await axios.patch(`http://localhost:3000/contact/${id}`, contact);
  dispatch({
    type: UPDATE_CONTACT,
    payload: res.data
  });
  return res;
};
