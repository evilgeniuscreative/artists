import react, { FunctionComponent } from 'react';
import './fof.css';
import { PageTitle } from '../PageTitle';

const FOF: FunctionComponent = () => {
  return (
    <main id='fof'>
      <PageTitle title='404 Page not found' />
      <h1>404 Page not found</h1>
      <p>
        <a href='/'>Return to homepage</a>
      </p>
    </main>
  );
};

export { FOF };
