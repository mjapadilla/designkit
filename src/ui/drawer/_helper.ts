/**
 * # Required Props
 * @param id - You need to pass the id you used from drawers
 *  #### Example usage
 * ```ts
 * clickDrawer('drawer-1' or 'drawer-2')
 * ```
 */

export const clickDrawer = (id: string) => {
  const targetElement: HTMLElement | null = document.getElementById(id);
  const x = document.querySelectorAll('div.drawer');

  // Check if the target element exists in the NodeList
  const drawerExists = Array.from(x).some((element) => element.id === id);

  if (targetElement && drawerExists) {
    return targetElement.click();
  }

  // eslint-disable-next-line no-console
  console.warn(`Drawer with '${id}' id is not one of the expected drawers IDs.

  Available ids are ${Array.from(x)?.map((i) => i?.id)}`);
  return alert(`
  Drawer with '${id}' id is not one of the expected drawers IDs.

  Available ids are ${Array.from(x)?.map((i) => i?.id)}`);
};
