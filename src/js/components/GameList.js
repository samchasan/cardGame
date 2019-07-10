import React from "react";

class GameList extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { complete, edit, name } = this.props;
    // console.log(this.props)

    if (edit) {
      return (
        <li>
          <input value={name} focus="focused"/>
        </li>
      );
    }

    return (
      <li>
        <span><a href={`game/${name}`}>{name}</a></span>
      </li>
    );
  }
}

export default GameList