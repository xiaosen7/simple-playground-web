import { useMemoizedFn, useMount, useUnmount, useUpdate } from "ahooks";
import { debounce } from "lodash-es";
import { useEffect, useRef, useState } from "react";
import { Observable, Subscription } from "rxjs";

export function useSubs<T>(
  observable: Observable<T>,
  effect: (value: T) => void
) {
  const fn = useMemoizedFn(effect);

  useEffect(() => {
    const sub = observable.subscribe(fn);
    return () => sub.unsubscribe();
  }, [observable]);
}

export function useSubsUpdate(observable: Observable<any>) {
  const update = useUpdate();
  useSubs(observable, update);
}

export function useObservable<T>(observable: Observable<T>) {
  const [value, setValue] = useState<T>();
  useSubs(observable, debounce(setValue));
  return value;
}

export function useObservableValues<T>(observable: Observable<T>) {
  const [values, setValues] = useState<T[]>([]);
  useSubs(observable, (value) => {
    setValues((x) => [...x, value]);
  });

  const clear = useMemoizedFn(() => {
    setValues([]);
  });
  return [values, clear] as const;
}
