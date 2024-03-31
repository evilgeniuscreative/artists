import React, { useEffect } from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  useEffect(() => {
    const myTitle = (): void => {
      document.title = title;
    };
    myTitle();
  }, [title]);

  return null;
};

export { PageTitle };
