import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span className="active link">{children}</span>;
    }

    return (
        <a className="link" href="#" onClick={e => {
            e.preventDefault();
            onClick();
        }}>
            {children}
        </a>
    );
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;
