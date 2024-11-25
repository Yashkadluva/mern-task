import React, { useEffect, useState } from 'react'
import WebService from '../utility/WebService';

const Profile = () => {
    const [userDetail, setUserDetail] = useState({})
    useEffect(() => {
        getUserDetial();
    }, [])

    const getUserDetial = () => {
        // 
        WebService.getAPI({ action: "get/user/detail" })
            .then((res: any) => {
                setUserDetail(res.data)
            })
            .catch((e: any) => { });
    };

    return (
        <div>Profile</div>
    )
}

export default Profile