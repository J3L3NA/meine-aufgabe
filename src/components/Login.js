import React, { Component, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
// import { GET_COURSES } from './Courses';
// import { useLazyQuery } from '@apollo/client';


// defining mutation to retrieve token and id
const LOGIN_MUTATION = gql`
mutation GetToken($email: String!, $password: String!) {
	Auth {
		login(
			input: {
				email: $email
				password: $password
			}
		) {
			token
			accounts {
				id
			}
		}
	}
}
`;


function LoginPage() {

  // setting variables for input from login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // for routing
  const history = useHistory();



  // passing mutation to useMutation
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      // storing token and id in local storage (works)
      localStorage.setItem('X-Auth-Token', JSON.stringify(data.Auth.login.token));
      localStorage.setItem('X-Auth-Account-Id', JSON.stringify(data.Auth.login.accounts[0].id));
    }
    // refetchQueries: [{ query: GET_COURSES }]  << potential solution to post 500 error?
  });

  // potential solution to post 500 error?
  // const token = localStorage.getItem('X-Auth-Token');
  // const id = localStorage.getItem('X-Auth-Account-Id');

  // const [getCourses, { data }] = useLazyQuery(GET_COURSES, {
  //   context: { headers: { 'X-Auth-Token': token, 'X-Auth-Account-Id': id } }
  // });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  // onClick submit button actions: perform mutation and route to courses page (works)
  const handleSubmit = (e) => {
    e.preventDefault();
    login({variables: { email, password }});    // .then(() => getCourses());  << potential solution to post 500 error?
    history.push('/courses');
  };

  // login form
  return (
    <div className="container">
      <form>
        <div className="form-div">
          <input
            className="input-field" placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-div">
          <input
            className="input-field" placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-div">
          <button id="login-button"
            onClick={handleSubmit}
            >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default class Login extends Component {
  render() {
    return(
      <div>
        <LoginPage />
      </div>
    )
  }
}
