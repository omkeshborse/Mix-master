import { useRouteError } from "react-router-dom";

function SinglePageError() {
  const error = useRouteError();
  console.log(error);
  return <h2 style={{textAlign: 'center' ,}}>{error.message}</h2>;
}
export default SinglePageError;
