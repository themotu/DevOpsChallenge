import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/app.less';
import { Root } from 'app/components/root';

function main(elementSelector) {
    ReactDOM.render(
        (<Root />),
        document.querySelector(elementSelector),
    );
}

main('body');
