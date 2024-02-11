import React from 'react';
import Title from './title/Title';
import DarkModeSwitcher from './darkModeSwitcher/DarkModeSwitcher';

const Header: React.FC = () => {
    return (
        <div className="container mx-auto">
            <Title />
            <DarkModeSwitcher />
        </div>
    );
};

export default Header;