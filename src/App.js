import React from "react";
import { Container, Row, Col } from "reactstrap";
import MainContent from "./Components/MainContant/MainContant";
import Sidebar from "./Components/Sidebar/Sidebar";
import POLLS from "./data/pools";
import shortid from "shortid";
import VoterName from "./Components/VoterName/VoterName";

class App extends React.Component {
  state = {
    polls: [],
    selectedPoll: {},
    searchTerm: "",
  };

  componentDidMount() {
    this.setState({ polls: POLLS });
  }

  addNewPoll = (polls) => {
    polls.id = shortid.generate();
    polls.created = new Date();
    polls.totalVote = 0;
    polls.opinions = [];

    this.setState({
      polls: this.state.polls.concat(polls),
    });
    alert("Your poll is Created");
  };

  updatePoll = (updatePoll) => {
    const polls = [...this.state.polls];
    const poll = polls.find((p) => p.id === updatePoll.id);

    poll.title = updatePoll.title;
    poll.description = updatePoll.description;
    poll.options = updatePoll.options;

    this.setState({ polls });
  };

  deletePoll = (pollId) => {
    const polls = this.state.polls.filter((p) => p.id !== pollId);
    this.setState({ polls, selectedPoll: {} });
  };

  selectPoll = (pollId) => {
    const poll = this.state.polls.find((p) => p.id === pollId);
    this.setState({ selectedPoll: poll });
  };

  getOpinion = (response) => {
    const { polls } = this.state;
    const poll = polls.find((p) => p.id === response.pollId);
    const option = poll.options.find((o) => o.id === response.selectedOption);

    poll.totalVote++;
    option.vote++;

    const opinion = {
      id: shortid.generate(),
      name: response.name,
      selectedOption: response.selectedOption,
    };
    poll.opinions.push(opinion);
    this.setState({ polls });
  };

  handleSearch = (searchTerm) => {
    this.setState({
      searchTerm,
    });
  };

  performSearch = () => {
    return this.state.polls.filter((poll) =>
      poll.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  render() {
    const polls = this.performSearch();
    console.log(this.state);
    return (
      <Container className="my-5">
        <Row>
          <Col md={5}>
            <Sidebar
              polls={polls}
              searchTerm={this.state.searchTerm}
              handleSearch={this.handleSearch}
              selectPoll={this.selectPoll}
              addNewPoll={this.addNewPoll}
            />
            <VoterName selectedPoll={this.state.selectedPoll} />
          </Col>
          <Col md={7}>
            <MainContent
              polls={this.state.selectedPoll}
              getOpinion={this.getOpinion}
              updatePoll={this.updatePoll}
              deletePoll={this.deletePoll}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
