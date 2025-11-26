'use client';

import { Button } from '@/components/ui/button';
import { useGlobalState } from '@/context/GlobalStateContext';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

export function GoToGeneratorButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        const randomId = nanoid();
        router.push(`/dashboard/generate/${randomId}`);
      }}
    >
      Create New Content
    </Button>
  );
}
