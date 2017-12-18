import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, FormControl, InputLabel, Input, Select, MenuItem} from 'material-ui';
import {PROJECT_TYPES, CONTRACT_VALUES} from 'util/Constants';
import './AddProject.css';

class AddProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectTypeItems: [],
            contractValueItems: [],
            selectedProjectId: "",
            selectedContractValueId: "",
        }
        this.selectProject = this.selectProject.bind(this);
        this.selectContract = this.selectContract.bind(this);
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

        const {projectTypeItems, contractValueItems, selectedProjectId, selectedContractValueId} = this.state;
        const {selectProject, selectContract} = this;

        return (
            <div className="add-projects-cont">
                <h2>Add a project you&apos;ve worked on</h2>
                <div className="upload-cont">
                    <Button className="button secondary-button">Upload photos</Button>
                </div>
                <div className="fields-container">
                    <FormControl className="form-control" fullWidth>
                        <InputLabel htmlFor="type">Select project type</InputLabel>
                        <Select
                            value={selectedProjectId}
                            onChange={selectProject}
                            input={<Input name="type" id="type" />}>
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
                        <InputLabel htmlFor="location">Add Location</InputLabel>
                        <Input
                            id="location"
                            value={this.state.amount}
                        />
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