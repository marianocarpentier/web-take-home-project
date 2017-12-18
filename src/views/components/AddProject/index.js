import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, FormControl, InputLabel, Input, Select, MenuItem} from 'material-ui';
import './AddProject.css';

class AddProject extends Component {
    state = {};
    load = this.load.bind(this);

    async load(...args) {
        // try {
        //     this.setState({ loading: true, error: false });
        //     const data = await loadData(...args);
        //     this.setState({ loading: false, data });
        // } catch (ex) {
        //     this.setState({ loading: false, error: true });
        // }
    }

    render() {
        return (
            <div className="add-projects-cont">
                <h2>Add a project you've worked on</h2>
                <div className="upload-cont">
                    <Button className="button secondary-button">Upload photos</Button>
                </div>
                <div className="fields-container">
                    <FormControl className="form-control" fullWidth>
                        <InputLabel htmlFor="type">Select project type</InputLabel>
                        <Select
                            value=""
                            input={<Input name="type" id="type"/>}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
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
                            value=""
                            input={<Input name="value" id="value"/>}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>$10</MenuItem>
                            <MenuItem value={20}>$20</MenuItem>
                            <MenuItem value={30}>$30</MenuItem>
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