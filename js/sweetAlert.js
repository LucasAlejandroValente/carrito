function showAlert(){Swal.fire({
    position: 'bottom-start',
    icon: 'info',
    title: '<p class="swal-text">Has añadido un producto al carrito.</p>',
    showConfirmButton: false,
    timer: 1500,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    backdrop: true
    })
};