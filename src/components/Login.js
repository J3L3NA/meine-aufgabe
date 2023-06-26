import React, { Component, useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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

  // passing mutation to useMutation
  const [login, { data , loading, error }] = useMutation(LOGIN_MUTATION);
  console.log(data);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  // storing token and id in local storage (currently not working)
  // localStorage.setItem("X-Auth-Token", JSON.stringify(data.Auth.login.token));
  // localStorage.setItem("X-Auth-Account-Id", JSON.stringify(data.Auth.login.accounts.id));

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
            onClick={
              () => login({ variables: { email, password } })
            }
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
