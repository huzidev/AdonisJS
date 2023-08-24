import { toast } from 'react-toastify';
import { MapErrorToState } from 'store/types';

export function errorNotification(error: MapErrorToState): void {
  toast.error(error?.message || error.errors?.map((v) => v.message).join('\n'), {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'dark:bg-gray-800 dark:text-white'
  });
}

export function successNotification(description?: string): void {
  toast.success(description, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // theme: localStorage.getItem('theme') ? 'dark' : 'light',
    className: 'dark:bg-gray-800 dark:text-white fill:text-white',
  });
}