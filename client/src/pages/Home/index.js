import React from "react";
import Header from "../../components/Header";
import Maps from "../../components/Maps";
import FarmCard from "../../components/FarmCard";
import SearchBar from "../../components/SearchBar";
import { useSelector } from "react-redux";
// import { isAuthenticated } from "../../auth";
// import { Redirect } from "react-router-dom";

//Styles
import "./styles.css";

export default function Home() {
  const selectedFarm = useSelector(state => state.data.selectedFarm);
  // const [logged, setLogged] = useState(false);
  // const [loading, setLoading] = useState(true);

  // const authUser = async () => {
  //   try {
  //     await isAuthenticated();
  //     setLogged(true);
  //     setLoading(false);
  //     console.log("logged");
  //   } catch (err) {
  //     setLogged(false);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   authUser();
  // }, []);

  // if (loading) return null;

  // const isRoot =
  //   location.pathname === "" ||
  //   location.pathname === "/" ||
  //   location.pathname === "/app" ||
  //   location.pathname === "/app/";

  // if (!logged) {
  //   return <Redirect to="/app/login" />;
  // }

  // if (isRoot) {
  //   return <Redirect to="/app/home" />;
  // }
  // console.log(authUser);

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div className="home-body">
        <div className="container-fluid align-feature">
          <div className="row row-home">
            <div className="col-md-5 col-map-home">
              <button
                className="whiteBlock"
                disabled={selectedFarm !== null ? true : false}
              >
                <h3> Search a farm first </h3>
              </button>
              <Maps />
            </div>
            <div className="col-md-6 offset-md-1 col-search-home">
              <SearchBar />
              <FarmCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
