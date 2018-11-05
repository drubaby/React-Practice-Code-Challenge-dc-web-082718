import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = props => {
  return (
    <Fragment>
      <div className="belt">
        {props.sushiList.map(sushi => (
          <Sushi
            key={sushi.id}
            sushi={sushi}
            handleSushiEaten={props.handleSushiEaten}
            eatenSushi={props.eatenSushi}
          />
        ))}
        <MoreButton handleMoreButton={props.handleMoreButton} />
      </div>
    </Fragment>
  );
};

export default SushiContainer;
