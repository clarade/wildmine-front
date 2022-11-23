import React, { useState } from 'react';
import { useMutation } from "@apollo/client";

import Close from '../../../images/icon-close.svg';
import { createImage, createFile } from '../../../graphql/Image';

const CreateImage = ({ setDisplayCreationImage }) => {
  const [name, setName] = useState('');

    const [sendImageInformations] = useMutation(
        createImage,
        {
          onCompleted: () => setDisplayCreationImage(false),
          onError: (error) => console.log(error.message),
        }
      );

    const [sendPicture] = useMutation(createFile);
    
    const onChange = async ({
        target: { validity, files: [file] }
    }) => {
        if (validity.valid) {
        const uplaoaded = await sendPicture({ variables: { picture: file } });

        uplaoaded.data.createFile && setName(file.name);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        sendImageInformations({
        variables: {
            name,
            projectId: "3",
            createdAt: new Date().toJSON(),
        }
        });
  };

  return (
    <div className='bg-wildmine_black border-4 border-secondary_color text-text_color rounded-2xl fixed z-30 w-1/2 left-1/4'>

      <p className='font-bold text-secondary_color text-2xl text-center my-8'>
        Ajouter une image 
      </p>

      <img
        className='cursor-pointer absolute right-8 top-6'
        src={Close}
        alt='Fermer la fenêtre'
        onClick={() => setDisplayCreationImage(false)}
      />
      
      <form onSubmit={onSubmit} className='w-2/3 mx-auto'>

        <div className='w-5/12 mx-auto flex justify-center'>
          <label className='button-general cursor-pointer'>
              {name || 'Sélectionnez une image'}

              <input
                type='file'
                onChange={onChange}
                accept='image/png, image/jpg, image/gif, image/jpeg'
                className='hidden'
              />
          </label>
        </div>

        <div className='text-center'>
          <button
            className='submit-button mb-8 mt-4'
          >
            Ajouter
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateImage;