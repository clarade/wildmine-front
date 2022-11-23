import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { NavLink } from 'react-router-dom';

import LoginInput from '../components/LoginInput';
import { signIn } from '../graphql/UserSession';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState();

    const [sendLoginInformations] = useMutation(
        signIn,
        {
          onCompleted: onLoginSuccess,
          onError: (error) => {
            console.log(error.message);
          },
          refetchQueries: ["signIn"],
        }
    );
    
    const onSubmit = async (event) => {
      event.preventDefault();
      const login = await sendLoginInformations({ variables: { email, password }});

        if (!login.data) setError(login.errors.message);

    };

    return (
        <>
            <div className="flex justify-center ">
                <form onSubmit={onSubmit} className="mt-8">
                    <LoginInput
                        label="Email"
                        value={email}
                        setValue={setEmail}
                        placeHolder="Entrez votre email"
                    />
                    
                    <LoginInput
                        label="Mot de passe"
                        value={password}
                        setValue={setPassword}
                        placeHolder="Entrez votre mot de passe"
                        type="password"
                    />

                    <div className="md:flex md:items-center mb-6">
                        <label className="md:w-3/3 text-gray-100 font-bold">
                            <input
                                label="checkbox"
                                className="mr-2 leading-tight"
                                type="checkbox"
                            />

                            <span className="text-sm">
                                Se souvenir de moi
                            </span>
                        </label>
                    </div>

                    {error &&
                        <div className="text-center text-red-700 mb-4">{error}</div>
                    }
                    <div className="flex justify-center">
                        <button className="login-button">
                            Me connecter
                        </button>
                    </div>

                    <div className="w-full text-center text-secondary_color mt-4 underline">
                        <NavLink to="/subscription">
                            Pas encore inscrit?
                        </NavLink>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;