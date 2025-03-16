import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';
import OwnerIntroduction from './OwnerIntroduction';

const OwnerIntroductionContainer = ({ documentId }) => {
  const { user } = useAuth(); // Retrieve the logged-in user
  const { data: ownerData, loading, error } = useData('home', documentId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return <OwnerIntroduction ownerData={ownerData} currentUser={user} />;
};

export default OwnerIntroductionContainer;
