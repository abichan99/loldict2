import React, { useEffect } from 'react';
import { insertHomepageLink } from './insertHomepageLink';

// Titleコンポーネントを定義
const Title = () => {
    useEffect(() => { 
        // コンポーネントがマウントされた時にinsertHomepageLinkを実行
        insertHomepageLink();
    })
    return (
        <div className="flex justify-center items-center my-5">
            {/* insertHomepageLink.jsから動的にhrefプロパティを挿入 */}
            <a id="header-title" className="font-sans text-4xl myapp-text">LOL 한일사전</a>
        </div>
    );
};

export default Title;