import { Store } from "@tanstack/store";

export const isNavigationOpen = new Store(false);

export function useMobileNavigation() {
  function closeNavigation() {
    isNavigationOpen.setState(() => false);
  }

  function openNavigation() {
    isNavigationOpen.setState(() => true);
  }

  return {
    closeNavigation,
    openNavigation,
  };
}
