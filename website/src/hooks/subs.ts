import { useMount, useUnmount } from "ahooks";
import { useRef } from "react";
import { Observable, Subscription } from "rxjs";

export function useSubs<T>(stream: Observable<T>, effect: (value: T) => void) {
  const sub = useRef<Subscription>();
  useMount(() => {
    sub.current = stream.subscribe(effect);
  });
  useUnmount(() => {
    sub.current?.unsubscribe();
  });
}
