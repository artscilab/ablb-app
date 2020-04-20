import React from 'react';
import { PageHeader, ActionButton } from '../components/common';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <PageHeader>404: page not found</PageHeader>
      <Link to="/">
        <ActionButton>
          HomePage
        </ActionButton>
      </Link>
      <Link to="/catalog">
        <ActionButton>
          Catalog
        </ActionButton>
      </Link>
    </div>
  );
}

export default NoMatch;