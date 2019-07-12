import React from "react";

class UserList extends React.Component {
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
        {name}
      </li>
    );
  }
}

export default UserList