import { MutableRefObject, useEffect } from 'react';

export function useClickOnBackground(
  ref: MutableRefObject<HTMLDivElement>,
  func: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        func();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
