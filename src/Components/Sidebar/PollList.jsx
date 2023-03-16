import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";
import shortid from "shortid";

const PollList = (props) => {
  if (props.polls.length === 0) {
    return <p>There is no Poll</p>;
  }

  return (
    <ListGroup>
      {props.polls?.map((poll) => (
        <ListGroupItem
          key={shortid.generate()}
          onClick={() => props.selectPoll(poll.id)}
          style={{ cursor: "pointer" }}
        >
          {poll.title.length > 30
            ? poll.title.substr(0, 30) + "..."
            : poll.title}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

PollList.propTypes = {
  polls: PropTypes.array.isRequired,
  selectPoll: PropTypes.func.isRequired,
};

export default PollList;
