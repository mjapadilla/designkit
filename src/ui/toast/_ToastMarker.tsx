export const toastUniqueID = 'toast-root';

function ToastMarker(props: object) {
  return <div id={toastUniqueID} {...props} />;
}

export default ToastMarker;
