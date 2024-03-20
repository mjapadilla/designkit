/**
 * # Required Props
 * @param id - You need to pass the id you used from modals
 *  #### Example usage
 * ```ts
 * clickModal('modal-1' or 'modal-2')
 * ```
 */

export const clickModal = (id: string) => {
  const targetElement: HTMLElement | null = document.getElementById(id);
  const x = document.querySelectorAll('div.modal');

  // Check if the target element exists in the NodeList
  const modalExists = Array.from(x).some((element) => element.id === id);

  if (targetElement && modalExists) {
    return targetElement.click();
  }

  // eslint-disable-next-line no-console
  console.warn(`Modal with '${id}' id is not one of the expected modals IDs.

  Available ids are ${Array.from(x)?.map((i) => i?.id)}`);
  return alert(`
  Modal with '${id}' id is not one of the expected modals IDs.

  Available ids are ${Array.from(x)?.map((i) => i?.id)}`);
};
