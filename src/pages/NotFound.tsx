import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">404 - Page Not Found</h1>
      <p className="mt-4 text-center">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
