export function toast(text, color) {
    Toastify({
      text: text,
      duration: 3000,
      close: true,
      gravity: 'top',
      className:'notToast',
      position: 'center',
      style: {
        background: color
      }
    }).showToast()
  }