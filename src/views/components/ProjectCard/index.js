import React, {Component} from 'react';
import {CONTRACT_VALUES} from 'util/Constants';
import './ProjectCard.css';

export default class ProjectCard extends Component {

    componentWillMount() {
    }

    render() {

        const {
            project
        } = this.props;

        const cVal = CONTRACT_VALUES.find(c =>
            c.min === project.min_contract_value && c.max === project.max_contract_value
        );
        // Note: Ideally I would format the min_contract_value
        // and max_contract_value instead of doing this

        let desc = project.posts ? project.posts[0].description : '';
        desc = desc.length >= 80 ? desc.substr(0, 80) + " ..." : desc;

        return (
            <div className="project-card">
                <p>{project.project_type_name}</p>
                <p>{desc}</p>
                <p>{cVal ? cVal.description : ''}</p>
                <p>{project.suburb + ' ' + project.state}</p>
            </div>
        );
    }
}