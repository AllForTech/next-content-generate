import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/GenerationContext';

export const RefinementPanel = ({ onClose, prompt }) => {
  const [outputFormat, setOutputFormat] = useState('text');
  const [tone, setTone] = useState('neutral');
  const [wordCount, setWordCount] = useState(500);

  const { onRefinePrompt, isRefineLoading } = useContent();

  const options = ['text', 'json', 'markdown'];

  const handleRefine = async () => {
    await onRefinePrompt();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-neutral-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h3 className="flex items-center text-lg font-semibold">
            <SlidersHorizontal className="mr-2 h-5 w-5 text-neutral-600" />
            Refine Prompt
          </h3>
          <Button onClick={onClose} variant="ghost" size="sm" className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Current Prompt Preview */}
        <div className="mb-4 max-h-24 overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-100 p-3 text-xs text-neutral-700 italic">
          {prompt?.substring(0, 100)}...
        </div>

        {/* Refinement Controls */}
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block text-xs">Output Format</Label>
            <div className="flex gap-2">
              {options.map((opt) => (
                <Button
                  key={opt}
                  type={'button'}
                  variant={outputFormat === opt ? 'default' : 'ghost'}
                  className={cn('text-xs')}
                  onClick={() => setOutputFormat(opt)}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Tone</Label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 p-2 text-sm"
            >
              <option value="neutral">Neutral / Informative</option>
              <option value="professional">Professional / Formal</option>
              <option value="friendly">Friendly / Casual</option>
            </select>
          </div>
        </div>

        <Button
          type={'button'}
          disabled={isRefineLoading}
          onClick={handleRefine}
          className="mt-6 w-full"
        >
          {isRefineLoading ? 'Refining...' : 'Apply Refinements'}
        </Button>
      </div>
    </div>
  );
};
