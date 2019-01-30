import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import CircularProgress from '@material-ui/core/CircularProgress';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import axios from 'axios';
import { Link } from 'react-router-dom';

import UserLayout from '../../hoc/user';

export default class AddFile extends Component {
  constructor() {
    super();

    this.state = {
      formSuccess: false,
      formError: false,
      uploading: false,
      files: [],
    };
  }

  componentDidMount = () => {
    axios.get('/api/users/files').then(response => {
      console.log(response.data);

      this.setState({
        files: response.data,
      });
    });
  };

  onDrop = files => {
    this.setState({
      uploading: true,
    });
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/users/uploadfile', formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          formError: false,
          formSuccess: true,
        },
        () => {
          setTimeout(() => {
            this.setState({
              formSuccess: false,
            });
          }, 2000);
        }
      );
    });
  };

  showUploadedImages = () => {
    return this.state.files
      ? this.state.files.map(item => (
          <li key={item}>
            <Link to={`/api/users/download/${item}`} target="_blank">
              {item}
            </Link>
          </li>
        ))
      : null;
  };

  render() {
    const { uploading, formSuccess, formError } = this.state;
    return (
      <UserLayout>
        <h1>Upload file</h1>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={event => this.onDrop(event)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </Dropzone>
            {uploading ? (
              <div
                className="dropzone_box"
                style={{ textAlign: 'center', paddingTop: '60px' }}
              >
                <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
              </div>
            ) : null}

            <div style={{ clear: 'both' }}>
              {formSuccess ? <div className="form_success">Success</div> : null}
              {formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
            </div>
          </div>
          {this.showUploadedImages()}
        </section>
      </UserLayout>
    );
  }
}
