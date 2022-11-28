import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Issues from "./Issues";
import DisplayProject from "./components/projects/DisplayProject";
import { userWithRelations, deleteSession } from "../graphql/UserSession";
import Button from "../components/Button";
import UpdateUser from "./components/users/UpdateUser";
import { getProjects } from "../graphql/Project.js";

const Settings = () => {
  const [displayHover, setDisplayHover] = useState(false);
  const { loading, error, data } = useQuery(userWithRelations);
  const { data: projects } = useQuery(getProjects);

  const [displayUpdateUser, setDisplayUpdateUser] = useState(false);

  const [deconnexion] = useMutation(deleteSession, {
    onCompleted: async () => {
      setTimeout(() => {
        window.location.replace("/");
      }, 200);
    },

    onError: (error) => console.log(error.message),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    deconnexion();
  };

  const handleLogout = () => {
    deconnexion({
      variables: {
        user: parseInt(actualUser.id),
      },
    });
  };

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  const actualUser = data.userWithRelations;

  if (actualUser.project_assigned === null) {
    return <div>Loading ...</div>;
  }

  console.log(actualUser.project_assigned);

  return (
    <div className="settings-container">
      <div>
        <div className="infos-user-container grid grid-cols-1 col-span-3 m-4">
          <h3 className="infos-title">Mes Informations</h3>
          <ul className="infos-content">
            <li className="infos-liste">
              <b>Nom : </b>
              {actualUser.last_name}
            </li>
            <li className="infos-liste">
              <b>Prénom : </b>
              {actualUser.first_name}
            </li>
            <li className="infos-liste">
              <b>Email : </b>
              {actualUser.email}
            </li>
            <li className="infos-liste">
              <b>Statut : </b>
              {actualUser.roles}
            </li>
          </ul>
          <form onSubmit={onSubmit} className="w-full mx-auto mb-4">
            <div className="text-center">
              <Button
                onClick={setDisplayUpdateUser}
                onClickValue={displayUpdateUser}
                buttonLabel="Mettre à jour mes informations"
                buttonType="button"
                buttonClassName="my-auto"
              />
              {displayUpdateUser && (
                <UpdateUser
                  setDisplayUpdateUser={setDisplayUpdateUser}
                  user={actualUser}
                />
              )}
              <button
                onClick={handleLogout}
                className="submit-button mb-8 mt-4"
              >
                Me déconnecter
              </button>
            </div>
          </form>
        </div>
        <div className="projects-user-container grid grid-cols-1 col-span-3 m-4">
          <h3 className="font-bold text-xl mb-2 text_color_light font-chaney_title divide-y divide-solid">
            Mes Projets
          </h3>
          <div className="projects-user-content">
            {actualUser && actualUser.project_assigned.length > 0 ? (
              actualUser.project_assigned.map((projectObject, index) => {
                return (
                  <DisplayProject
                    key={index}
                    setDisplayHover={setDisplayHover}
                    index={index}
                    projectObject={projectObject}
                    displayHover={displayHover}
                    project={projectObject}
                    to="/issue"
                    //isMobile={isMobile}
                  />
                );
              })
            ) : (
              <p>Aucun projet pour le moment</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="issues-user-container">
          <div className="grid grid-cols-1 col-span-3 m-4">
            <h3 className="font-bold text-xl mb-2 text_color_light font-chaney_title divide-y divide-solid mt-8">
              Mes Tickets
            </h3>
          </div>
        </div>
        {actualUser.issues_assigned ? (
          <div>
            <Issues issues={actualUser.issues_assigned} />
          </div>
        ) : (
          <p className="mx-auto text-xl font-bold tracking-wide py-20">
            Aucun ticket ne vous est assigné
          </p>
        )}
      </div>
    </div>
  );
};

export default Settings;
