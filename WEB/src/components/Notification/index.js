import { store } from 'react-notifications-component';

/**
 * types disponiveis: 
 * success (default)
 *  danger
 *  info
 *  default
 *  warning
 */
export const showNotification = (
  message = '',
  title = '',
  type = 'success',
  insert = "bottom",
  container = "bottom-center",
  animationIn = ["animated", "fadeIn"],
  animationOut = ["animated", "fadeOut"],
  dismiss = {
    duration: 4000,
    onScreen: false
  }
) => {
  store.addNotification({
    title,
    message,
    type,
    insert,
    container,
    animationIn,
    animationOut,
    dismiss
  });
}
