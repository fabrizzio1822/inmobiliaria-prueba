'use client'
import { useSession} from 'next-auth/react';
import AdminNav from "../AdminNav/AdminNav";
import Loader from '../Loader/Loader';
import { Error404 } from '../Error404';
import React from 'react';
import { UserDasboard } from '../UserDashboard';
export default function DashboardAdmin() {
    const { data, status } = useSession();
    return (
        <div className="container mx-auto mb-5 mt-3">
            {status === 'loading' ? (
                <Loader className='flex justify-center items-center h-screen w-full'/>
            ):  status === 'authenticated' ? (
                data?.user?.role === "admin" ? 
                <div>
                    <AdminNav />
                </div> :                            
                <div>
                    <UserDasboard/>
                </div>
            ) :
                <Error404/>
            } 
        </div>
    );
}