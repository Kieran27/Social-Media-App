import { ReactEventHandler } from "react";
import { useEffect } from "react";

// Hook
const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    [ref, handler]
  );
};

export default useOnClickOutside;
