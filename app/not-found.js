'use client';
import dynamic from 'next/dynamic';

const Error404 = dynamic(() => import('@/components/Error404/Error404'), {
  ssr: false,
});

export default function Error() {
  return (
    <div>
      <Error404/>
    </div>
  );
}