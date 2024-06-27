import React from 'react';
import profileImage from './images/profilepng.png'; // Assuming this is the correct path

import './Profile.css';

function Profile() {
    return (
        <div>
            <img id="i1" src="https://kreafolk.com/cdn/shop/articles/spotify-logo-design-history-and-evolution-kreafolk_b995ad53-7473-4492-9710-58b9e5c32ecd.jpg?v=1717725016&width=2048" alt="Icon" />
            <img id="u1" src={profileImage} alt="user" />
        </div>
    );
}

export default Profile;
