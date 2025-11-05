import {cn} from "@/lib/utils";
import { GenerateContent } from '@/components/Layout/Generate/GenerateContent';

export default function Generate() {

    return (
        <div className={cn('container-full center')}>
          <GenerateContent/>
        </div>
    )
}