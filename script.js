document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const envelope = document.getElementById('envelope');
    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnRedeem = document.getElementById('btn-redeem');
    
    const view1 = document.getElementById('view1');
    const view2 = document.getElementById('view2');
    const view3 = document.getElementById('view3');
    const view4 = document.getElementById('view4');

    // --- INTERACCIÓN 1: Abrir el sobre ---
    envelope.addEventListener('click', function openEnvelope() {
        // Evitamos que se abra múltiples veces
        envelope.removeEventListener('click', openEnvelope);
        
        envelope.classList.add('stop-pulse');
        envelope.classList.add('open');

        // Mostramos el botón después de que la carta sube (aprox 1.2 segundos)
        setTimeout(() => {
            btnNext1.classList.remove('hidden');
        }, 1200);
    });

    // --- INTERACCIÓN 2: Cerrar sobre e ir al carrusel ---
    btnNext1.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el click pase al sobre
        
        btnNext1.classList.add('hidden');
        envelope.classList.remove('open');
        envelope.classList.add('close');

        // Esperamos a que la carta baje y la solapa cierre, luego desvanecemos
        setTimeout(() => {
            envelope.classList.add('fade-out');
        }, 1000);

        // Cambiamos de vista suavemente
        setTimeout(() => {
            view1.classList.remove('active');
            view2.classList.add('active');
            initSwiper(); // Inicializamos el carrusel cuando la vista es visible
        }, 1600);
    });

    // --- INTERACCIÓN 3: Configuración del Carrusel (Swiper.js) ---
    function initSwiper() {
        const swiper = new Swiper('.mySwiper', {
            effect: 'cards', // Efecto muy bonito tipo tarjetas de Tinder/Stack
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
            },
            on: {
                // Evento que se dispara al llegar a la última foto
                reachEnd: function () {
                    btnNext2.classList.remove('hidden');
                }
            }
        });
    }

    // --- INTERACCIÓN 4: Ir al Cupón final ---
    btnNext2.addEventListener('click', () => {
        view2.classList.remove('active');
        view3.classList.add('active');
        // Aquí podrías agregar una librería de confeti si quieres un toque extra ;)
    });

    // --- INTERACCIÓN 5: Canjear cupón e ir a vista final ---
    btnRedeem.addEventListener('click', () => {
        view3.classList.remove('active');
        view4.classList.add('active');
    });
});