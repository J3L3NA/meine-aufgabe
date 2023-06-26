import '../App.css';
import { useQuery, gql } from '@apollo/client';
import Login from './Login';

// define query for learnOpportunities
const GET_COURSES = gql`
  query GetCourses {
    LearnV2 {
      LearnV2(first: 20) {
        edges {
          node {
            id
            shortDescription
            structureDefinition {title}
            image{url}
          }
        }
      }
    }
  }
`;

function DisplayCourses() {
  // passing query to useQuery
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p></p>;  //Error : {error.message}

  // mapping course information to divs
  return data.LearnV2.LearnV2.edges.node.map(({ id, shortDescription, structureDefinition, image  }) => (
    <div key={id}>
      <h3>{structureDefinition.title}</h3>
      <img width="400" height="250" alt="course-icon" src={`${image.url}`} />
      <p>{shortDescription}</p>
    </div>
  ));
}

const App = () => {
  return (
    <div>
      <Login />
      <DisplayCourses />
    </div>
  );
};

export default App;
