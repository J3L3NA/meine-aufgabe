import React, { Component, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

// defining mutation to retrieve token and id
export const LOGIN_MUTATION = gql`
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

  // onClick submit button actions: perform mutation and route to courses page
  const handleSubmit = (e) => {
    e.preventDefault();
    login({variables: { email, password }});
    history.push('/courses');
  };

  // passing mutation to useMutation
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      // storing token and id in local storage
      localStorage.setItem("X-Auth-Token", JSON.stringify(data.Auth.login.token));
      localStorage.setItem("X-Auth-Account-Id", JSON.stringify(data.Auth.login.accounts[0].id));
    }
  });
  console.log(localStorage.getItem("X-Auth-Token"));
  console.log(localStorage.getItem("X-Auth-Account-Id"));

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  // login form
  // TODO: route to courses page when succesfully logged in
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
