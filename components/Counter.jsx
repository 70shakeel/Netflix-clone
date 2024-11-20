"use client"; // Required for client components in App Router

import useStore from "@/app/store/store";
export default function Counter() {
  const { count, increment, decrement, reset } = useStore();

  return (
    <div className="w-[500px] h-[500px] ">
      <h1>Count: {count}</h1>
      <div className="flex gap-6">
        <button onClick={increment} className="px-4 py-2 border">
          Increment
        </button>
        <button onClick={decrement} className="px-4 py-2 border">
          Decrement
        </button>
        <button onClick={reset} className="px-4 py-2 border">
          Reset
        </button>
      </div>
    </div>
  );
}
