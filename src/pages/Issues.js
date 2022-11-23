import React, { useState } from 'react';
import { useQuery } from "@apollo/client";

import SearchButton from '../components/SearchButton';
import DisplayIssuesTitle from './components/issues/DisplayIssuesTitle';
import DisplayIssuesValues from './components/issues/DisplayIssuesValues';
import { userWithRelations } from '../graphql/UserSession';
import { NavLink } from 'react-router-dom';

const Issues = () => {
	const { loading, data } = useQuery(userWithRelations);

  const [foundIssues, setFoundIssues] = useState([]);
  const [valuesToCompare, setValuesToCompare] = useState('');

  if (loading) return <div className='mx-auto'>Chargement...</div>

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = data.userWithRelations.issues_assigned.filter((issue) => {
        return issue.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundIssues(results);

    } else {
      setFoundIssues(data.userWithRelations.issues_assigned);
    }
    setValuesToCompare(keyword);
  };

  if (foundIssues.length === 0 && !valuesToCompare && data.userWithRelations.issues_assigned.length > 0) {
    setFoundIssues(data.userWithRelations.issues_assigned);
  }
  
  return (
    <>
  <div className='px-4 md:flex justify-around mb-8'>

      <SearchButton
        value={valuesToCompare}
        onChange={filter}
      />


    <div>
    <DisplayIssuesTitle/>
      {data.userWithRelations.issues_assigned
      ? foundIssues.map((issue, issueIndex) => (
        <NavLink to={`/issue/${issue.id}`}>
          <DisplayIssuesValues key={issueIndex} issue={issue} issueIndex={issueIndex} issues={foundIssues}/>
        </NavLink>
      ))
    : <p className='text-xl font-bold'>Aucun ticket ne vous est assigné pour le moment</p>}
    </div>
  </div></>);
};

export default Issues;