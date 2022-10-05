import * as React from "react";

export const useDisclose = (initState = false) => {
  const [isOpen, setIsOpen] = React.useState(initState || false);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const onToggle = React.useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return { isOpen, onClose, onOpen, onToggle };
};
