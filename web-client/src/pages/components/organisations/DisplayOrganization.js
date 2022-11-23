import React from 'react';
import arrow from '../../../assets/images/arrow-right.svg';

const DisplayOrganization = ({ organizationObject, organization }) => {
	return (
		<div className="organization-projects-container" key={organizationObject}>
			<div className="grid grid-flow-col">
				<div className="col-span-10">
					<h3 className="organization-title">{organization.name}</h3>
					<p className="organization-desc">{organization.description}</p>
					<p className="organization-collaborators">Liste des collaborateurs (wip)</p>
				</div>
				<div className="col-span-2 organization-btn">
					<img className="h-6 w-6" src={arrow} alt="Accéder au détail de l'organisation"/>
				</div>
			</div>
		</div>
	);
};

export default DisplayOrganization;
