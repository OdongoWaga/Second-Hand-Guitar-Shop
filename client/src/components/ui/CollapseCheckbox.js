import React, { Component } from 'react';
import FontAwersoneIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

export default class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: [],
  };

  componentDidMount = () => {
    const { initState } = this.props;
    if (initState) {
      this.setState({
        open: initState,
      });
    }
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleAngle = () =>
    this.state.open ? (
      <FontAwersoneIcon icon={faAngleUp} className="icon" />
    ) : (
      <FontAwersoneIcon icon={faAngleDown} className="icon" />
    );

  handleToggle = id => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked,
      },
      () => this.props.handleFilters(newChecked)
    );
  };

  renderList = () => {
    const { list } = this.props;
    const { checked } = this.state;
    return list
      ? list.map(item => (
          <ListItem key={item._id} style={{ padding: '10px 0' }}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={() => this.handleToggle(item._id)}
                checked={checked.indexOf(item._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;
  };

  render() {
    const { title } = this.props;
    return (
      <div>
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: '10px 23px 10px 0' }}
          >
            <ListItemText primary={title} className="collapse_title" />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
