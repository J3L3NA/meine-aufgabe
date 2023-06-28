import React, { Component } from 'react';
import { useQuery, gql } from '@apollo/client';

// defining query for learnOpportunities
const GET_COURSES = gql`
  query GetCourses {
    LearnV2 {
      SearchLearnOpportunities(first: 20) {
        edges {
          node {
            id
            shortDescription
            structureDefinition {title}
            image {url}
          }
        }
      }
    }
  }
`;

function DisplayCourses() {
  // passing query to useQuery
  // const token = localStorage.getItem("X-Auth-Token")
  // const id = localStorage.getItem("X-Auth-Account-Id")

  const { loading, error, data } = useQuery(GET_COURSES, {
    context: { headers: { authorization: localStorage.getItem("X-Auth-Token", "X-Auth-Account-Id") } }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;  //Error : {error.message}

  // mapping course information to divs
  return data.LearnV2.SearchLearnOpportunities.edges.node.map(({ id, shortDescription, structureDefinition, image  }) => (
    <div key={id}>
      <h3>{structureDefinition.title}</h3>
      <img width="400" height="250" alt="course-icon" src={`${image.url}`} />
      <p>{shortDescription}</p>
    </div>
  ));
  // TODO: filtering option
}

export default class Courses extends Component {
  render() {
    return(
      <div>
        <DisplayCourses />
      </div>
    )
  }
}
