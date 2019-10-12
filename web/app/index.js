import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/app.less';

function main(elementSelector) {
    ReactDOM.render(
        (<Root />),
        document.querySelector(elementSelector),
    );
}

main('body');
