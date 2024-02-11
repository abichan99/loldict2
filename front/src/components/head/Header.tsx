import React from 'react';
import Title from './title/Title';
import DarkModeSwitcher from './darkModeSwitcher/DarkModeSwitcher';

const Header: React.FC = () => {
    return (
        <div>
            <Title />
            <DarkModeSwitcher />
        </div>
    );
};

export default Header;