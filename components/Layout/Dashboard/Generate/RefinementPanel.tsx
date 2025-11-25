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
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl p-6 shadow-2xl border border-neutral-200">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold flex items-center">
            <SlidersHorizontal className="w-5 h-5 mr-2 text-neutral-600" />
            Refine Prompt
          </h3>
          <Button onClick={onClose} variant="ghost" size="sm" className="h-8 w-8 p-0"><X className="w-4 h-4" /></Button>
        </div>

        {/* Current Prompt Preview */}
        <div className="mb-4 p-3 bg-neutral-100 rounded-lg max-h-24 overflow-y-auto text-xs text-neutral-700 border border-neutral-200 italic">
          {prompt?.substring(0, 100)}...
        </div>

        {/* Refinement Controls */}
        <div className="space-y-4">
          <div>
            <Label className="block text-xs mb-2">Output Format</Label>
            <div className="flex gap-2">
              {options.map(opt => (
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
            <Label className="block mb-2">Tone</Label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full text-sm border border-neutral-300 rounded-lg p-2"
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
          className="w-full mt-6">
          {isRefineLoading ? 'Refining...' : 'Apply Refinements'}
        </Button>
      </div>
    </div>
  );
};
