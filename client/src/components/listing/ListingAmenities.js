import React, { useCallback, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import amenities from '../../utils/amenities';
import * as actions from '../../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import NavigateButtons from './NavigateButtons';

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

  const renderAmenities = () => {
    return amenities.order.map(amenity => {
      return (
        <div key={amenity}>
          <div className="ui checkbox">
            <Field type="checkbox" name={amenity} component="input" />
            <label>{amenity}</label>
          </div>
        </div>
      );
    });
  };

  const onFormSubmit = formValues => {
    if (files) {
      const image = props.submitListing(files);
    }

    props.onSubmit();
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

  return (
    <div>
      <div className="ui container segment">
        <form onSubmit={props.handleSubmit(onFormSubmit)}>
          <h4 className="ui dividing header">
            Please select available amenities{' '}
            <div className="ui sub header">Optional</div>
          </h4>
          {renderAmenities()}
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
            Summary <div className="ui sub header">Optional</div>
          </h4>
        </form>
      </div>
      <NavigateButtons
        onDismiss={props.previousPage}
        dismiss="Back"
        submit="Next"
        onSubmit={props.handleSubmit(onFormSubmit)}
      />
    </div>
  );
};

export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({
    // initialValues: amenities,
    form: 'listing',
    destroyOnUnmount: false
  })
)(ListingAmenities);
