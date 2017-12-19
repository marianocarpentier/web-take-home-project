import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, FormControl, InputLabel, Input, Select, MenuItem} from 'material-ui';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {PROJECT_TYPES, CONTRACT_VALUES} from 'util/Constants';
import {openUploadCareDialog, projectPayloadCreator} from 'util/helpers/ProjectHelpers';
import {postProject} from 'actions/ProjectActions';
import './AddProject.css';

class AddProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectTypeItems: [],
            contractValueItems: [],
            pictureItems: [],
            pictures: [],
            selectedProjectId: '',
            selectedContractValueId: '',
            address: '',
            addressCode: 0,
            latLng: {},
            description: '',
            contract: {min: 0, max: 0}
        }
        this.selectProject = this.selectProject.bind(this);
        this.selectContract = this.selectContract.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handlePictures = this.handlePictures.bind(this);
        this.handleAddProject = this.handleAddProject.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
    }

    handlePictures(picsArray) {
        this.setState({
            ...this.state,
            pictures: picsArray,
            pictureItems: picsArray.map(pic =>
                <div className="pic-cont" key={pic.name}>
                    <div className="pic">
                        <img alt={pic.name} src={pic.url}/>
                    </div>
                </div>
            )
        })
    }

    handleChangeDesc(event) {
        this.setState({...this.state, description: event.target.value});
    }

    handleLocationChange(address) {

        let addressCode = 0;

        geocodeByAddress(address)
            .then(results => {
                addressCode = results[0];
                return getLatLng(addressCode)
            })
            .then(latLng => {
                this.setState({
                    ...this.state,
                    addressCode,
                    latLng
                })
            })
            .catch(error => console.error('Error', error))

        this.setState({...this.state, address})
    }

    handleAddProject() {

        const {
            addressCode, latLng, description, pictures,
            contract, selectedProjectId
        } = this.state;

        const {dispatch, posting} = this.props;

        if (posting)
            return;

        let projectPayload = projectPayloadCreator(addressCode, pictures, contract,
            latLng, description, selectedProjectId);

        // Note: I'm pretty sure that sending the dispatcher
        // as a parameter to the action is not the cleanest
        // way to do this. Search for a better way.
        dispatch(postProject(projectPayload, dispatch));
    }

    selectProject(event) {
        this.setState(...this.state, {
            selectedProjectId: event.target.value
        })
    }

    selectContract(event) {

        const selectedContractValueId = event.target.value;

        let contract = CONTRACT_VALUES.find(contract => contract.id === selectedContractValueId);
        if (!contract)
            contract = {min: 0, max: 0}

        this.setState(...this.state, {
            selectedContractValueId: selectedContractValueId,
            contract: contract
        })
    }

    componentWillMount() {

        this.setState(...this.state, {
            projectTypeItems: PROJECT_TYPES.map(prj =>
                <MenuItem key={prj.id} value={prj.id}>
                    {prj.name}
                </MenuItem>),
            contractValueItems: CONTRACT_VALUES.map(val =>
                <MenuItem key={val.id} value={val.id}>
                    {val.description}
                </MenuItem>)
        });
    }

    renderErrors() {

        const {
            error, posting, message, fieldHints
        } = this.props;

        let placeError = error && fieldHints && (
            fieldHints['suburb'] ||
            fieldHints['state'] ||
            fieldHints['location_lat'] ||
            fieldHints['location_long'] ||
            fieldHints['address']) ?
            (<div className="message error-message">The selected address is not valid.
                Most likely, is not specific enough.</div>) : '';

        let projectError = error && fieldHints && fieldHints.project_type_id ?
            <div className="message error-message">{fieldHints.project_type_id}</div> : '';

        let descriptionError = error && fieldHints && fieldHints.description ?
            <div className="message error-message">{fieldHints.description}</div> : '';

        let generalError = error && !fieldHints ? <div className="message error-message">{message}</div> : '';

        let status = posting ? <div className="message info-message">The project is being submitted.</div> : '';

        return {
            placeError, projectError,
            descriptionError, generalError, status
        }
    }

    render() {

        const {
            projectTypeItems, contractValueItems, selectedProjectId,
            selectedContractValueId, address, pictureItems
        } = this.state;


        const {
            selectProject, selectContract, handleChangeDesc,
            handleLocationChange, handlePictures, handleAddProject
        } = this;

        const inputProps = {
            value: address,
            onChange: handleLocationChange,
            placeholder: 'Add Location'
        }

        const cssClasses = {
            input: 'location-autocomplete',
            autocompleteContainer: 'autocomplete-container',
            autocompleteItem: 'autocomplete-item',
            autocompleteItemActive: 'autocomplete-item-active',
            googleLogoContainer: 'google-logo-container'
        }

        let info = this.renderErrors();

        return (
            <div className="add-projects-cont">
                <h2>Add a project you&apos;ve worked on</h2>
                <div className="upload-cont">
                    <Button className="button secondary-button" onClick={() => {
                        openUploadCareDialog(picsArray => handlePictures(picsArray));
                    }}>Upload photos</Button>
                </div>
                <div className="pics">
                    {pictureItems}
                </div>
                <div className="fields-container">
                    <FormControl className="form-control" fullWidth>
                        <InputLabel htmlFor="type">Select project type</InputLabel>
                        <Select
                            value={selectedProjectId}
                            onChange={selectProject}
                            input={<Input name="type" id="type"/>}>
                            {projectTypeItems}
                        </Select>
                        {info.projectError}
                    </FormControl>
                    <FormControl className="form-control" fullWidth>
                        <InputLabel htmlFor="description">Add a project description</InputLabel>
                        <Input
                            id="description"
                            value={this.state.amount}
                            onChange={handleChangeDesc}
                        />
                        {info.descriptionError}
                    </FormControl>
                    <FormControl className="form-control" fullWidth>
                        <InputLabel htmlFor="value">Select a contract value</InputLabel>
                        <Select
                            value={selectedContractValueId}
                            onChange={selectContract}
                            input={<Input name="value" id="value"/>}>
                            {contractValueItems}
                        </Select>
                    </FormControl>
                    <FormControl className="form-control" fullWidth>
                        <PlacesAutocomplete inputProps={inputProps} classNames={cssClasses}/>
                        {info.placeError}
                    </FormControl>
                </div>
                {info.generalError}
                {info.status}
                <Button className={'button primary-button ' + (this.props.posting ? 'disabled' : '')}
                        onClick={handleAddProject}>Submit</Button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    const proj = state.Project;
    return {
        error: proj.error,
        posting: proj.posting,
        message: proj.message,
        fieldHints: proj.fieldHints
    }
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddProject);