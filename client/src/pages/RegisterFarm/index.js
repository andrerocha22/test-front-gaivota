import React from "react";
import { useDispatch } from "react-redux";
import AddNewFarmForm from "../../components/AddNewFarmForm";
import farmApi from "../../apis/farms";
import Header from "../../components/Header";
import { loadFarmData } from "../../actions/index";
import "./styles.css";
import { useHistory } from "react-router-dom";

export default function RegisterFarm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    event.preventDefault();

    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("myModalContent");
    var message = document.getElementById("messageModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    };
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    const json = JSON.stringify({
      farm_id: Number(values.farm_id),
      name: values.name,
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      culture: values.culture,
      variety: values.variety,
      total_area: Number(values.total_area),
      yield_estimation: Number(values.yield_estimation),
      price: Number(values.price)
    });

    await farmApi
      .post("/farms/create", json, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        console.log(response);
        dispatch(loadFarmData());
        modalContent.style.background = "#393";
        message.innerHTML = "Farm created with sucess";
        setTimeout(() => {
          history.push("/app/home");
        }, 1500);
      })
      .catch(error => {
        modalContent.style.background = "#933";
        message.innerHTML = `${error.response.data.error} - Check the form and try again`;
      });
  };

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div className="create-farm-body">
        <div className="container-fluid align-center">
          <div className="row row-checkout">
            <div className="col-md-6">
              <h3>New Farm</h3>
              <AddNewFarmForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      <div id="myModal" className="modal">
        <div id="myModalContent" className="modal-content">
          <span className="close">&times;</span>
          <p id="messageModal" className="modal-message">
            Text
          </p>
        </div>
      </div>
    </div>
  );
}
