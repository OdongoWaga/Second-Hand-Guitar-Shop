import React, { Component } from 'react';

import FontAwersoneIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';

export default class CollapseRadio extends Component {
  state = {
    open: false,
    value: '1',
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

  renderList = () =>
    this.props.list
      ? this.props.list.map(value => (
          <FormControlLabel
            key={value._id}
            value={`${value._id}`}
            control={<Radio />}
            label={value.name}
          />
        ))
      : null;

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
    this.props.handleFilters(event.target.value);
  };

  render() {
    const { title } = this.props;
    return (
      <div>
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: '10px 23px 10px 0px' }}
          >
            <ListItemText primary={title} className="collapse_title" />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
                style={{ padding: '0 20px' }}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
