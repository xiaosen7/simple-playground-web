import { useMemoizedFn, useMount, useUnmount } from "ahooks";
import { useRef } from "react";
import { Observable, Subscription } from "rxjs";

export function useSubs<T>(stream: Observable<T>, effect: (value: T) => void) {
  const sub = useRef<Subscription>();
  const fn = useMemoizedFn(effect);
  useMount(() => {
    sub.current = stream.subscribe(fn);
  });
  useUnmount(() => {
    sub.current?.unsubscribe();
  });
}
