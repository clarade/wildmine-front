import React, { useState } from 'react';
import { useMutation } from "@apollo/client";

import Close from '../../../images/icon-close.svg';
import Input from '../../../components/Input';
import { assignUserToProject } from '../../../graphql/Project';

const AddUserToProject = ({ setDisplayAddUserOnProject, refetch, projectId }) => {
  const [email, setEmail] = useState('');

  const [addUserToProject] = useMutation(
    assignUserToProject,
    {
      onCompleted: () => {
        refetch();
        setDisplayAddUserOnProject(false);
      },
      onError: (error) => console.log(error.message),
      refetchQueries: ["getProjectById"],
    }
  );

  const onSubmit = event => {
    event.preventDefault();
    
    addUserToProject({
      variables: {
        email,
        projectId: parseInt(projectId),
      }
    });
  }
  return <div className='modal-background'>
    <div className='modal-container'>
      <p className='modal-title'>Ajouter un collaborateur</p>

      <img
        className='modal-close'
        src={Close}
        alt='Fermer la fenêtre'
        onClick={() => setDisplayAddUserOnProject(false)}
      />

    <form onSubmit={onSubmit} className='w-2/3 mx-auto'>

      <Input
        label='Adresse email du collaborateur'
        placeHolder="Entrez l'email du collaborateur"
        labelClassName='text-sm'
        setValue={setEmail}
        value={email}
        required
      />

      <div className='text-center'>
        <button
          className='submit-button mb-8 mt-4'
        >
          Ajouter ce collaborateur au projet
        </button>
      </div>

    </form>
    </div>
  </div>;
};

export default AddUserToProject;