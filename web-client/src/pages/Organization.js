import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getOrganizations } from '../graphql/Organization.js';

import DisplayOrganization from './components/organisations/DisplayOrganization';
import CreateOrganization from './components/organisations/CreateOrganization';
import Button from '../components/Button';
import SearchButton from '../components/SearchButton.js';

const Organization = () => {
	const [displayHover, setDisplayHover] = useState(false);
	const [displayCreation, setDisplayCreation] = useState(false);
	const [foundOrganization, setFoundOrganization] = useState([]);
  const [valuesToCompare, setValuesToCompare] = useState('')

	const { loading, error, data } = useQuery(getOrganizations);

  if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = data.Organizations.filter((issue) => {
        return issue.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundOrganization(results);

    } else {
      setFoundOrganization(data.Organizations);
    }
    setValuesToCompare(keyword);
  };

  if (foundOrganization.length === 0 && !valuesToCompare && data.Organizations.length > 0) {
    setFoundOrganization(data.Organizations);
  }

	return (
		<div className="organization-container">
			<h2 className="font-chaney_title py-6 text-2xl">Organisations</h2>
			<div className="flex justify-around sm:flex-1 my-8">
    
			<SearchButton
        value={valuesToCompare}
        onChange={filter}
      />


				<Button
					onClick={setDisplayCreation}
					onClickValue={displayCreation}
					buttonLabel="Créer une organisation"
					buttonType="button"
				/>
			</div>

			{displayCreation && <CreateOrganization setDisplayCreation={setDisplayCreation} />}

			<div className="my-24">
				{foundOrganization.length > 0 ? (
					foundOrganization.map((organizationObject, index) => {
						return (
							<DisplayOrganization
								key={index}
								setDisplayHover={setDisplayHover}
								index={index}
								organizationObject={organizationObject}
								displayHover={displayHover}
								organization={foundOrganization[index]}
							/>
						);
					})
				) : (
					<p className='text-xl font-bold'>Aucune organisation pour le moment</p>
				)}
			</div>
		</div>
	);
};

export default Organization;
