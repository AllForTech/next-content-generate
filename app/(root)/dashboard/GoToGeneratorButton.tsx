
'use client';

import { Button } from "@/components/ui/button";
import { useGlobalState } from "@/context/GlobalStateContext";

export function GoToGeneratorButton() {
  const { setCreateContentDialogOpen } = useGlobalState();

  return (
    <Button onClick={() => setCreateContentDialogOpen(true)}>
      Create New Content
    </Button>
  );
}
