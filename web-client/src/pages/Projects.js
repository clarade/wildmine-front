import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getProjects } from '../graphql/Project.js';

import DisplayProject from './components/projects/DisplayProject';
import CreateProject from './components/projects/CreateProject';
import Button from '../components/Button';
import SearchButton from '../components/SearchButton.js';

const Projects = ({ isMobile }) => {
	const [displayHover, setDisplayHover] = useState(false);
  const [displayCreation, setDisplayCreation] = useState(false);

  const [foundProject, setFoundProject] = useState([]);
  const [valuesToCompare, setValuesToCompare] = useState('');


  const { loading, error, data } = useQuery(getProjects);


  if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;


  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = data.projects.filter((issue) => {
        return issue.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundProject(results);

    } else {
      setFoundProject(data.projects);
    }
    setValuesToCompare(keyword);
  };

  if (foundProject.length === 0 && !valuesToCompare && data.projects.length > 0) {
    setFoundProject(data.projects);
  }


  return (
    <div>
      <div className='px-4 md:flex justify-around mb-8'>
    
      <SearchButton
        value={valuesToCompare}
        onChange={filter}
      />


      <Button
        onClick={setDisplayCreation}
        onClickValue={displayCreation}
        buttonLabel='Créer un projet'
        buttonType='button'
        buttonClassName='my-auto mt-4 md:mt-0'
      />


      </div>

      {displayCreation &&
        <CreateProject setDisplayCreation={setDisplayCreation}/>
      }

      <div className='projects-container'>

        {foundProject.length > 0 ? foundProject.map((projectObject, index) => {

          return <DisplayProject
              key={index}
              setDisplayHover={setDisplayHover}
              index={index}
              projectObject={projectObject}
              displayHover={displayHover}

              project={foundProject[index]}
              to="/issue"
              isMobile={isMobile}
            />;
        })
      :<p className='text-xl font-bold'>Aucun projet pour le moment</p>}

      </div>
    </div>
  );
}

export default Projects;
