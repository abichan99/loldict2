import React, { useEffect } from 'react';

// Titleコンポーネントを定義
const Title = () => {
    return (
        <div className="flex flex-col justify-cneter items-center my-3">
            <p  className="text-2xl myapp-text">검색 이력</p>
            <div className="flex justify-cneter items-center">
                <button id="scroll-button-left" style={{ touchAction: 'none', userSelect: 'none' }} onContextMenu={() => false}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-slate-700 dark:fill-slate-500 object-cover">
                        <polygon points="15.293 3.293 6.586 12 15.293 20.707 16.707 19.293 9.414 12 16.707 4.707 15.293 3.293"/>
                    </svg>
                </button>
                <div id="searchingHistoryField" className="flex overflow-x-hidden m-3" style={{ maxWidth: '40vw' }}>
                </div>
                <button id="scroll-button-right" style={{ touchAction: 'none', userSelect: 'none' }} onContextMenu={() => false}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-slate-700 dark:fill-slate-500 object-cover">
                        <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Title;