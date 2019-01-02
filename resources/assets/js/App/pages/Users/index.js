import React, { PropTypes } from 'react';

const Users = ({ className }) => {
    return (
        <h1>Users</h1>
    );
};

Users.displayName = 'Users';

Users.propTypes = {
    className: PropTypes.string,
};

export default Users;
