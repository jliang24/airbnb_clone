import React, { useCallback, useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import amenities from '../../utils/amenities';
import * as actions from '../../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import NavigateButtons from './NavigateButtons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#696969';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #edeaea
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  font-color: black; 
  &:hover {
    background-color: #e2e0e0; 
    cursor: pointer; 
  }
`;

const Icon = styled.div`
  margin-left: 5px;
  display: inline-block;
  opacity: 0.5;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const ListingAmenities = props => {
  const [files, setFile] = useState([]);
  const [descriptionText, setDescriptionText] = useState('');
  const [customAmenity, setAmenity] = useState('');
  const [customIcon, setIcon] = useState('');
  const [customAmenityObj, setCustomAmenity] = useState({ order: [] });

  useEffect(() => {
    if (props.descriptionText) setDescriptionText(props.descriptionText);
    if (props.files) setFile(props.files);
  }, []);

  const renderAmenities = () => {
    return amenities.order.map(amenity => {
      return (
        <div key={amenity}>
          <div className="ui checkbox">
            <Field type="checkbox" name={amenity} component="input" />
            <label>
              {' '}
              <i className={`${amenities[amenity].icon} icon`} />
              {amenity}
            </label>
          </div>
        </div>
      );
    });
  };

  const onDrop = useCallback(acceptedFiles => {
    // Check if files are unique by comparing names of dropped files with state files
    for (let droppedFile of acceptedFiles) {
      for (let file of files) {
        if (droppedFile.name === file.name) return;
      }
    }

    setFile([...files, ...acceptedFiles]);
  });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: 'image/*' });

  const removeFile = fileSelected => {
    const newFileArr = files.filter(file => file.name !== fileSelected.name);

    setFile(newFileArr);
  };

  const dropFiles = files.map(file => (
    <div key={file.path}>
      <li>
        {file.path}
        <Icon>
          <i
            onClick={() => removeFile(file)}
            className="trash alternate icon"
          />
        </Icon>
      </li>
    </div>
  ));

  const changeDescriptionText = text => {
    setDescriptionText(text);
  };

  const onFormSubmit = formValues => {
    if (files) {
      const image = props.submitListing(files);
    }
    props.addDetails({ descriptionText });

    props.onSubmit();
  };

  const onCustomAmenitySubmit = () => {
    if (customAmenityObj.hasOwnProperty(customAmenity) || customAmenity === '')
      return;

    const order = [...customAmenityObj.order, customAmenity];
    setCustomAmenity({
      ...customAmenityObj,
      [customAmenity]: customIcon.toLowerCase(),
      order: order
    });

    setAmenity('');
    setIcon('');
  };

  const renderCustomAmenities = () => {
    return customAmenityObj.order.map(amenity => {
      return (
        <div
          key={amenity}
          style={{ display: 'block', margin: '2px 0px' }}
          className="ui checkbox"
        >
          <Field type="checkbox" name={amenity} component="input" />
          <label>
            {customAmenityObj[amenity] !== '' && (
              <i className={`${customAmenityObj[amenity]} icon`} />
            )}
            {amenity}
          </label>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="ui container segment general">
        <form onSubmit={props.handleSubmit(onFormSubmit)}>
          <h4 className="ui dividing header">
            Please select available amenities{' '}
            <div className="ui sub header">Optional</div>
          </h4>
          <div className="ui grid">
            <div className="three wide column">{renderAmenities()}</div>
            <div className="three wide column">{renderCustomAmenities()}</div>
            <div className="four wide column">
              <div
                style={{ width: '190px', display: 'inline-block' }}
                class="ui container segment dolly100-background"
              >
                <div>
                  <h5 style={{ width: '160px' }} className="ui dividing header">
                    Add your own amenities!
                  </h5>
                  <label style={{ display: 'block' }}> Amenity Name</label>
                  <div className="ui mini input">
                    <input
                      value={customAmenity}
                      onChange={e => setAmenity(e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label>Icon Name (Optional) </label>
                  <a
                    target="_blank"
                    href="https://semantic-ui.com/elements/icon.html"
                  >
                    {' '}
                    <i className="question circle outline icon" />
                  </a>
                  <div className="ui mini input">
                    <input
                      value={customIcon}
                      onChange={e => setIcon(e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <button
                  className="ui button dolly200-background"
                  type="button"
                  onClick={onCustomAmenitySubmit}
                  style={{ width: '150px', marginTop: '15px' }}
                >
                  Add Amenity
                </button>
              </div>
            </div>
          </div>
          <h4 className="ui dividing header">
            Pictures <div className="ui sub header">Optional</div>
          </h4>
          <h5>Add some pictures!</h5>
          <div className="container">
            <Container
              {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            >
              <input {...getInputProps()} />
              <p style={{ color: 'black' }}>
                Drag 'n' drop some files here, or click to select files.
              </p>
            </Container>
          </div>
          {files.length > 0 && <h5>Files</h5>}
          <ul>{dropFiles}</ul>
          <h4 className="ui dividing header">
            Listing Details <div className="ui sub header">Optional</div>
          </h4>
          <ReactQuill
            className="nobackground"
            value={descriptionText}
            onChange={changeDescriptionText}
          />
        </form>
      </div>
      <NavigateButtons
        onDismiss={props.previousPage}
        dismiss="Back"
        submit="Show Preview"
        onSubmit={props.handleSubmit(onFormSubmit)}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    descriptionText: state.details.descriptionText
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    // initialValues: amenities,
    form: 'listing',
    destroyOnUnmount: false
  })
)(ListingAmenities);
