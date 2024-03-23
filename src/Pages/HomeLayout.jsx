import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Components/Navbar";

function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const someValue = "value in context"
  return (
    <>
      <Navbar />
      <section className="page">
        {isPageLoading ? (
          <div className="spinner">
            <div className="loading" />
          </div>
        ) : (
          <Outlet context={{someValue}}/>
        )}
      </section>
    </>
  );
}
export default HomeLayout;
