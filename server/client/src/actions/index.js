import axios from 'axios';
import { FETCH_USER, SUBMIT_SURVEY } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const handleToken = token => async dispatch => {
  console.log('token', token);
  const res = await axios.post('/api/stripe', token);

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');

  dispatch({
    type: SUBMIT_SURVEY,
    payload: res.data
  });
};
