import React from "react";

class VoterName extends React.Component {
  render() {
    const { selectedPoll } = this.props;
    console.log(selectedPoll);

    if (Object.keys(selectedPoll).length === 0) {
      return <div style={{ padding: "20px" }}>There is No VOTER</div>;
    }

    return selectedPoll.opinions?.map((voter) => (
      <div style={{ padding: "10px" }}>
        <ul class="list-group list-group-numbered">
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">{voter?.name}</div>
              {"kdfalks"}
            </div>
          </li>
        </ul>
      </div>
    ));
  }
}

export default VoterName;
