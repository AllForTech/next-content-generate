import {cn} from "@/lib/utils";


export default function Home() {
  return (
    <div className={cn('screen relative center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 overflow-hidden')}>
        <div className={"absolute inset-0 backdrop-blur-sm bg-black/20"}/>
    </div>
  );
}
