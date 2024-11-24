import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2>{error.message || "Error"}</h2>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}
