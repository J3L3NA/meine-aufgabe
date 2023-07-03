import React, { Component } from 'react';
import { useQuery, gql } from '@apollo/client';

// defining query for learnOpportunities
export const GET_COURSES = gql`
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
  const token = localStorage.getItem('X-Auth-Token');
  const id = localStorage.getItem('X-Auth-Account-Id');

  // passing query to useQuery with headers
  const { loading, error, data } = useQuery(GET_COURSES, {
    context: { headers: { 'X-Auth-Token': token, 'X-Auth-Account-Id': id } }
  });
  // const { loading, error, data } = useQuery(GET_COURSES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);

  return data.LearnV2.SearchLearnOpportunities.edges.map((edge) => {
    return (
      <div key={edge.node.id}>
        <strong>Description: </strong>
        <p> {edge.node.shortDescription}</p>

        <strong>Title: </strong>
        <p> {edge.node.structureDefinition.title}</p>
        <hr />
      </div>
    );
  });

  // TODO: filtering option

  // mapping course information to divs << old version version
  // return data.LearnV2.SearchLearnOpportunities.edges.node.map(({ id, shortDescription, structureDefinition, image  }) => (
  //   <div key={id}>
  //     <h1>Here come the learn opportunities</h1>
  //     <h3>{structureDefinition.title}</h3>
  //     <img width="400" height="250" alt="course-icon" src={`${image.url}`} />
  //     <p>{shortDescription}</p>
  //   </div>
  // ));

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
