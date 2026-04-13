
//temas

document.addEventListener('DOMContentLoaded', function() {
  const temaBtn = document.getElementById('tema');
  document.body.classList.remove('dark-mode', 'light-mode');
  // Leer preferencia guardada
  const temaGuardado = localStorage.getItem('tema');
  if (temaGuardado) {
    
    document.body.classList.add(temaGuardado);
  }else {
  document.body.classList.add('dark-mode'); // 👈 modo por defecto
}

  temaBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Alternar clases
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    // Guardar preferencia
    const modoActual = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('tema', modoActual);
  });

  
});

//imágenes galería

document.querySelectorAll('.galeria img').forEach(function(img) {
  img.addEventListener('click', function() {
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const overlayText = overlay.querySelector('p');

    overlayImg.src = img.src;
    overlayText.textContent = img.dataset.descripcion; // 👈 aquí se usa el atributo
    overlay.classList.add('visible');
  });

  document.getElementById('overlay').addEventListener('click', function() {
  this.classList.remove('visible');
  });


});



//hamurguesa menu

const ham_menu = document.querySelector("#ham_menu");
const cerrar = document.querySelector("#cerrar");
const abrir = document.querySelector("#hamburger button");

abrir.addEventListener("click", () => {
  ham_menu.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  ham_menu.classList.remove("visible");
});


//contacto

window.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionamos el formulario por su ID
    const form = document.getElementById("contact-form");

    // 2. Creamos la función asíncrona que manejará el envío
    async function handleSubmit(event) {
        event.preventDefault(); // Detenemos la recarga de página (¡Ahora sí!)

        const status = document.getElementById("form-status"); // El <p> para mensajes
        const data = new FormData(event.target); // Recoge los datos de los inputs

        // Usamos fetch para enviar los datos a la URL del action
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json' // Le decimos a Formspree que queremos JSON, no HTML
            }
        }).then(response => {
            if (response.ok) {
                // ÉXITO: Limpiamos el form y avisamos
                status.innerHTML = "Thanks! Your message has been sent.";
                status.style.color = "green"; // Opcional: estilo
                status.style.fontWeight = "bold";
                
                form.reset(); 
            } else {
                // ERROR: Formspree nos devolvió un error (ej: email inválido)
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "There was a problem submitting the form.";
                    }
                    status.style.color = "red";
                    status.style.fontWeight = "bold";
                    
                });
            }
        }).catch(error => {
            // ERROR DE RED: No hay internet o falló la conexión
            status.innerHTML = "Conection error. Try again.";
            status.style.color = "red";
            status.style.fontWeight = "bold";
            
        });
    }

    // 3. Añadimos el "escuchador" al formulario
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

  
});