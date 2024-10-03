import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export interface ProfileProps {
    token: string;
    handleLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ token, handleLogout }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userData, setUserData] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/profile', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setUserData(response.data))
            .catch(() => navigate('/login'));
    }, [token, navigate])

    return (
        <div><h2>Profile</h2>
            {/* <img src="userData.img" alt="Pic" /> */}
            <p><img src="uss" alt="pic" /></p>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <p>DOB: {userData.dateOfBirth}</p>
            <p>Gender: {userData.gender}</p>
            <p>Phone: {userData.phoneNumber}</p>
            <Link to="/update-profile">Update Profile</Link>
            <button onClick={handleLogout}>Logout</button></div>
    );
}

export default Profile