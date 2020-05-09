import React from 'react';
import { PageHeader, PageContent, ActionButton } from '../components/common';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <PageHeader>404: page not found</PageHeader>
      <PageContent>
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
      </PageContent>
    </div>
  );
}

export default NoMatch;