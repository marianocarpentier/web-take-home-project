import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, FormControl, InputLabel, Input, Select, MenuItem} from 'material-ui';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {PROJECT_TYPES, CONTRACT_VALUES} from 'util/Constants';
import * as Helpers from 'util/helpers/ProjectHelpers';
import './AddProject.css';

class AddProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectTypeItems: [],
            contractValueItems: [],
            pictureItems: [],
            pictures: [],
            selectedProjectId: "",
            selectedContractValueId: "",
            address: "",
            addressCode: 0,
            latLng: {},
        }
        this.selectProject = this.selectProject.bind(this);
        this.selectContract = this.selectContract.bind(this);
        this.onLocationChange = this.changeLocation.bind(this);
        this.handlePictures = this.handlePictures.bind(this);
    }

    handlePictures(picsArray) {
        this.setState({
            ...this.state,
            pictures: picsArray,
            pictureItems: picsArray.map(pic =>
                <div className="pic-cont">
                    <div className="pic">
                        <img alt={pic.name} src={pic.url}/>
                    </div>
                </div>
            )
        })
    }

    changeLocation(address) {

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

    selectProject(event) {
        this.setState(...this.state, {
            selectedProjectId: event.target.value
        })
    }

    selectContract(event) {
        this.setState(...this.state, {
            selectedContractValueId: event.target.value
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

    render() {

        const {
            projectTypeItems, contractValueItems, selectedProjectId,
            selectedContractValueId, address, pictureItems
        } = this.state;

        console.log(this.state);

        const {openUploadCareDialog} = Helpers;

        const {selectProject, selectContract, onLocationChange, handlePictures} = this;

        const inputProps = {
            value: address,
            onChange: onLocationChange,
            placeholder: 'Add Location'
        }

        const cssClasses = {
            input: 'location-autocomplete',
            autocompleteContainer: 'autocomplete-container',
            autocompleteItem: 'autocomplete-item',
            autocompleteItemActive: 'autocomplete-item-active',
            googleLogoContainer: 'google-logo-container'
        }

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
                    </FormControl>
                    <FormControl className="form-control" fullWidth>
                        <InputLabel htmlFor="description">Add a project description</InputLabel>
                        <Input
                            id="description"
                            value={this.state.amount}
                        />
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
                    </FormControl>
                </div>
                <Button className="button primary-button">Submit</Button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {}
}


const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(AddProject);