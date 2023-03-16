import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ParticipateForm from "./ParticipateForm";
import PollForm from "../Sidebar/PollForm";
import PropTypes from "prop-types";

class MainContent extends React.Component {
  state = {
    openModal: false,
  };

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  render() {
    if (Object.keys(this.props.polls).length === 0) {
      return (
        <div>
          <h3>Welcome TO My Application</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      );
    }

    const { polls, getOpinion, updatePoll, deletePoll } = this.props;

    return (
      <div
        style={{ background: "#F9FBFA", borderRadius: "5px", padding: "10px" }}
      >
        <h3>{polls.title}</h3>
        <p>{polls.description}</p>
        <br />
        <ParticipateForm
          polls={polls}
          getOpinion={getOpinion}
          toggleModal={this.toggleModal}
          deletePoll={deletePoll}
        />
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModal}>Update Poll</ModalHeader>
          <ModalBody>
            <PollForm
              polls={polls}
              isUpdate={true}
              submit={updatePoll}
              buttonValue="Update Poll"
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

MainContent.propTypes = {
  polls: PropTypes.object.isRequired,
  getOpinion: PropTypes.func.isRequired,
  updatePoll: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired,
};

export default MainContent;
