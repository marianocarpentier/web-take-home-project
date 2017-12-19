//-----------------------------------------------------------------------------------------
//--------------------------------- Third party imports -----------------------------------
//-----------------------------------------------------------------------------------------

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Dialog, Icon} from 'material-ui';

//-----------------------------------------------------------------------------------------
//------------------------------------ Local imports --------------------------------------
//-----------------------------------------------------------------------------------------

import './Home.css';
import WorkyardLogo from '../assets/images/workyard-logo.svg';
import AddProject from './components/AddProject';

//-----------------------------------------------------------------------------------------
//------------------------------------ Home Component -------------------------------------
//-----------------------------------------------------------------------------------------


class Home extends Component {

    //-------------------------------------------------------------------------
    //------------------ Constructor & Lifecycle methods ----------------------
    //-------------------------------------------------------------------------

    constructor(props) {
        super(props);
        this.state = {openModal: false}
        this.handlerCreateProject = this.handlerCreateProject.bind(this);
        this.handlerClose = this.handlerClose.bind(this);
    }

    //-------------------------------------------------------------------------
    //------------------------- Handler methods -------------------------------
    //-------------------------------------------------------------------------

    handlerCreateProject() {
        this.setState({openModal: true});
    };

    handlerClose() {
        this.setState({openModal: false});
    };

    //-------------------------------------------------------------------------
    //------------------------------- Render ----------------------------------
    //-------------------------------------------------------------------------

    render() {

        const {handlerCreateProject, handlerClose} = this;

        return (
            <div className="home-container">
                <div className="logo-container">
                    <img src={WorkyardLogo} alt="Workyard logo" className="workyard-logo"/>
                </div>
                <h1 className="main-title">Post a project</h1>
                <Button className="main-button" onClick={handlerCreateProject}>Create Project</Button>
                <Dialog open={this.state.openModal}>
                    <div className="dialog-class">
                        <Button className="close" onClick={handlerClose}>
                            <Icon>close</Icon>
                        </Button>
                        <AddProject/>
                    </div>
                </Dialog>
            </div>
        );
    }
}


//-------------------------------------------------------------------------
//-------------------- Mapping store to Home's props ----------------------
//-------------------------------------------------------------------------


const mapStateToProps = (state, ownProps) => {

    return {}
}


const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);