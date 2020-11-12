import React, { useCallback, useState, useEffect } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import NavigateButtons from 'components/Listing/NavigateButtons';
import amenities from 'utils/amenities';
import * as actions from 'actions';

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
  const [customAmenityArr, setCustomAmenity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileLimitError, setFileError] = useState('');

  useEffect(() => {
    const { descriptionText, files, customAmenityArr } = props;

    if (descriptionText) {
      setDescriptionText(props.descriptionText);
    }

    if (files) {
      setFile(files);
    }

    if (customAmenityArr) {
      setCustomAmenity(customAmenityArr);
    }
  }, []);

  const renderAmenities = () => {
    return amenities.order.map(amenity => {
      return (
        <div key={amenity}>
          <div className="ui checkbox">
            <Field type="checkbox" name={amenity} component="input" />
            <label>
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

  const onCustomAmenitySubmit = () => {
    if (customAmenityArr.some(({ name }) => name === customAmenity)) return;
    props.dispatch(
      initialize('amenities', {
        ...props.amenities.values,
        [customAmenity]: true
      })
    );
    const amenityObj = {
      name: customAmenity,
      icon: customIcon
    };

    setCustomAmenity([...customAmenityArr, amenityObj]);

    setAmenity('');
    setIcon('');
  };

  const renderCustomAmenities = () => {
    return customAmenityArr.map(({ name, icon }) => {
      return (
        <div
          key={name}
          style={{ display: 'block', margin: '2px 0px' }}
          className="ui checkbox"
        >
          <Field type="checkbox" name={name} component="input" />
          <label>
            {icon !== '' && <i className={`${icon} icon`} />}
            {name}
          </label>
        </div>
      );
    });
  };

  const onFormSubmit = async () => {
    if (files.length > 9) return setFileError('Max upload limit is 9');
    setLoading(true);
    if (files.length > 0) {
      await props.uploadPictures(files);
    }
    const _user = { firstName: '', lastName: '' };
    props.addDetails({ descriptionText, files, customAmenityArr, _user });

    props.onSubmit();
  };

  const onBack = () => {
    props.previousPage();
    props.addDetails({ descriptionText, files, customAmenityArr });
  };

  const renderPictures = () => {
    if (!props.pictures || props.pictures.length === 0) return null;
    const picContainer = props.pictures.map(picURL => (
      <img
        key={picURL}
        alt={picURL}
        style={{ maxHeight: '200px' }}
        className="card"
        src={picURL}
      />
    ));
    return (
      <>
        <h4 className="ui divided header">
          Uploaded Pictures{' '}
          <button onClick={props.clearPictures} className="ui button">
            {' '}
            Clear Pictures
          </button>
        </h4>
        <div className="ui four cards">{picContainer}</div>
        <div>
          <i className="exclamation circle icon" />
          Adding new files will erase currently uploaded pictures!
        </div>
      </>
    );
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
            <div id="amenities" className="three wide column">
              {renderAmenities()}
            </div>
            <div id="custom-amenities" className="three wide column">
              {renderCustomAmenities()}
            </div>
            <div id="custom-amenities-form" className="four wide column">
              <div
                style={{ width: '190px', display: 'inline-block' }}
                className="ui container segment dolly100-background"
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
                    rel="noopener noreferrer"
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
          <div className="container">
            <Container
              {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            >
              <input {...getInputProps()} />
              <p style={{ color: 'black' }}>
                Drag 'n' drop some files here, or click to select files. <br />
                <br />
                {<i className="info circle icon" />}The first picture will be
                the cover thumbnail for this listing. <br />
                {<i className="info circle icon" />} A randomly generated
                placeholder image will be provided if no pictures are attached.{' '}
                <br />
                {<i className="info circle icon" />} PNG files will take longer
                to upload.
              </p>
            </Container>
          </div>
          {fileLimitError && (
            <div className="ui red basic label">{fileLimitError}</div>
          )}
          {files.length > 0 && <h5>Files</h5>}
          <ul>{dropFiles}</ul>
          {renderPictures()}
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
        onDismiss={onBack}
        dismiss="Back"
        submit="Show Preview"
        loading={loading}
        onSubmit={props.handleSubmit(onFormSubmit)}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    descriptionText: state.details.descriptionText,
    files: state.details.files,
    pictures: state.pictures,
    customAmenityArr: state.details.customAmenityArr,
    amenities: state.form.amenities,
    user: state.auth,
    deviceWidth: state.deviceDims.width
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    form: 'amenities',
    destroyOnUnmount: false,
    enablenReinitialize: true
  })
)(ListingAmenities);
