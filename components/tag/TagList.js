"use client";
import { useEffect } from 'react';
import { useTag } from '@/context/tag';

export default function TagList() {
    const { tags, fetchTags, setUpdatingTag } = useTag();
    
    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div className="my-5">
            {tags?.map(t => (
                <button
                    key={t._id}
                    className="bg-bordo hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
                    onClick={() => setUpdatingTag(t)}
                >
                    {t.name}
                </button>
            ))}
        </div>
    );
}
