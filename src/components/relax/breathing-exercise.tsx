'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const breathingCycle = [
  { text: 'Breathe In', duration: 4000, state: 'grow' },
  { text: 'Hold', duration: 4000, state: 'hold' },
  { text: 'Breathe Out', duration: 4000, state: 'shrink' },
  { text: 'Hold', duration: 4000, state: 'hold' },
];

export function BreathingExercise() {
  const [open, setOpen] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setCycleIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      setCycleIndex((prevIndex) => (prevIndex + 1) % breathingCycle.length);
    }, breathingCycle[cycleIndex].duration);

    return () => clearTimeout(timer);
  }, [open, cycleIndex]);
  
  const currentPhase = breathingCycle[cycleIndex];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Start Exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Box Breathing</DialogTitle>
          <DialogDescription>
            Follow the guide to calm your mind. Find a comfortable position and begin.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center h-64 my-4">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div
              className={cn(
                'absolute bg-primary rounded-full transition-all duration-4000 ease-linear',
                currentPhase.state === 'grow' && 'w-48 h-48 opacity-100',
                currentPhase.state === 'hold' && 'w-48 h-48 opacity-100',
                currentPhase.state === 'shrink' && 'w-16 h-16 opacity-70'
              )}
              style={{
                // Start with small circle for shrink-to-grow transition
                width: currentPhase.state === 'hold' && cycleIndex === 3 ? '4rem' : undefined, 
                height: currentPhase.state === 'hold' && cycleIndex === 3 ? '4rem' : undefined,
                opacity: currentPhase.state === 'hold' && cycleIndex === 3 ? 0.7 : undefined,
              }}
            />
             <span className="z-10 text-2xl font-bold text-primary-foreground">
              {currentPhase.text}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
