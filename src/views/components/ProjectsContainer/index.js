import React, {Component} from 'react';
import ProjectCard from '../ProjectCard';
import './ProjectsContainer.css';

export default class ProjectsContainer extends Component {

    componentWillMount() {
    }

    render() {

        const {
            projects
        } = this.props;

        let projectCards = projects.map(p => <ProjectCard key={p.id} project={p} />);

        return (
            <div className="project-container">
                {projectCards}
            </div>
        );
    }
}