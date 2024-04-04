import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">Loading...</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </h2>
      </div>
    </div>
  );
};

// Good use of the spread operator, not opinionated about what kind of props
function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary
      errorComponent={
        <h2>
          There was an error with this listing.
          <Link to="/">Click here to return home</Link>
        </h2>
      }
    >
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
