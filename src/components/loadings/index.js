import React from 'react';

const Loading = props => {

    let loader = '';
    let checkmark = '';
    if(props.status === 'ok') {
        loader = 'load-complete';
        checkmark = 'checkmark-show draw';
    } else if(props.status === 'error') {
        loader = 'load-error';
        checkmark = 'checkmark-show error';
    }

    return(
        <div className="text-center">
            <div className={"circle-loader " + loader}>
                <div className={"checkmark " + checkmark }></div>
            </div>
        </div>
    );
}

export default Loading;