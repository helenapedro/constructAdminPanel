import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const StatusBadge = ({ Icon, href }) => {
    return (
        <Button variant="link" href={href} target="_blank" rel="noopener noreferrer">
            <Icon size={24} />
        </Button>
    );
};

StatusBadge.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    href: PropTypes.string.isRequired,
};

export default StatusBadge;