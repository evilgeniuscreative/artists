import React, { useEffect } from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  useEffect(() => {
    const myTitle = (): void => {
      document.title = title;
    };
    myTitle();
  }, [title]);

  return null;
};

export { Header };
