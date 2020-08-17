import React from "react";
import DefaultProfileImage from "../Images/default-profile-image.jpg";

const UserAside = ({ profileImageURL, username }) => (
    <aside className="col-sm-2">
        <div className="panel panel-default">
            <div className="panel-body">
                <img src={profileImageURL || DefaultProfileImage}
                alt={username}
                className="img-thumbnail"
                width="200"
                height="200"/>
            </div>
        </div>
    </aside>
);

export default UserAside;