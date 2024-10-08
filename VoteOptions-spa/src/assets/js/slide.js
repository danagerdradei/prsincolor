const slides = document.querySelectorAll('.category-slide');
const nextBtns = document.querySelectorAll('.new-next-btn');
const backBtns = document.querySelectorAll('.new-back-btn');
const submitBtn = document.querySelector('.new-submit-btn'); // Nuevo botón de enviar
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });
});

backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
});

// Selección de opciones
const options = document.querySelectorAll('.new-option');
options.forEach(option => {
    option.addEventListener('click', () => {
        const category = option.getAttribute('data-category');
        document.querySelectorAll(`.new-option[data-category="${category}"]`).forEach(opt => {
            opt.classList.remove('new-selected');
        });
        option.classList.add('new-selected');
    });
});

// Evento para el botón de enviar encuesta
submitBtn.addEventListener('click', () => {
    // Aquí puedes manejar el envío de la encuesta
    alert('¡Encuesta enviada! Gracias por participar.');
    // Aquí podrías hacer una solicitud al backend para enviar las respuestas
});
