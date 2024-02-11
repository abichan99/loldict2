import React from 'react';

const Title = () => {
    return (
        <div className="flex justify-center items-center my-5">
            {/* insertHomepageLink.jsから動的にhrefプロパティを挿入 */}
            <a id="header-title" className="text-4xl myapp-text">LOL 한일사전</a>
        </div>
    );
};

export default Title;