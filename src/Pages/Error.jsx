import Wrapper from "../assets/wrappers/ErrorPage";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/not-found.svg";
function Error() {
  const error = useRouteError();
  console.log(error);
  if (error.status == 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Not found" />
          <h3>Ohh!</h3>
          <p>We can't seem to find page you are looking for</p>
          <Link to={"/"}>Back To Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong please try again</h3>
      </div>
    </Wrapper>
  );
}
export default Error;
