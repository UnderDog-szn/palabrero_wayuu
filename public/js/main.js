// ========== SELECTS PERSONALIZADOS ==========
const selectsCustom = document.querySelectorAll('.select-custom');

selectsCustom.forEach(function (select) {
    const selected = select.querySelector('.select-selected');
    const opciones = select.querySelector('.select-opciones');
    const input = select.querySelector('input[type="hidden"]');

    selected.addEventListener('click', function () {
        selectsCustom.forEach(function (otro) {
            if (otro !== select) {
                otro.querySelector('.select-opciones').classList.add('oculto');
                otro.querySelector('.select-selected').classList.remove('abierto');
            }
        });
        opciones.classList.toggle('oculto');
        selected.classList.toggle('abierto');
    });

    opciones.querySelectorAll('li').forEach(function (li) {
        li.addEventListener('click', function () {
            selected.textContent = li.textContent;
            input.value = li.dataset.value;
            opciones.querySelectorAll('li').forEach(l => l.classList.remove('seleccionado'));
            li.classList.add('seleccionado');
            opciones.classList.add('oculto');
            selected.classList.remove('abierto');
        });
    });
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.select-custom')) {
        selectsCustom.forEach(function (select) {
            select.querySelector('.select-opciones').classList.add('oculto');
            select.querySelector('.select-selected').classList.remove('abierto');
        });
    }
});

// ========== MAPA DE IDs ==========
const mapaIds = {
    'menor18': 1, '18-25': 2, '26-35': 3, '36-45': 4, '46-60': 5, 'mayor60': 6,
    'riohacha': 7, 'otro-guajira': 8, 'otro-colombia': 9, 'extranjero': 10,
    'turista': 11, 'residente': 12, 'estudiante': 13, 'investigador': 14, 'otro': 15
};

// ========== FORMULARIO ==========
const formulario = document.getElementById('formulario-visitante');
const seccionFormulario = document.getElementById('seccion-formulario');
const seccionMonumento = document.getElementById('seccion-monumento');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const edad = document.querySelector('input[name="edad"]').value;
    const procedencia = document.querySelector('input[name="procedencia"]').value;
    const tipoVisitante = document.querySelector('input[name="tipo_visitante"]').value;

    if (!edad || !procedencia || !tipoVisitante) {
        alert('Por favor completa todos los campos antes de continuar.');
        return;
    }

    const payload = {
        id_encuesta: 1,
        respuestas: [
            { id_pregunta: 1, id_opcion: mapaIds[edad] },
            { id_pregunta: 2, id_opcion: mapaIds[procedencia] },
            { id_pregunta: 3, id_opcion: mapaIds[tipoVisitante] }
        ]
    };

    fetch('https://sevidor-encuestas-production.up.railway.app/respuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(function (respuesta) { return respuesta.json(); })
        .then(function (resultado) {
            console.log('Respuesta del servidor:', resultado);
            seccionFormulario.classList.add('desvanecer');
            setTimeout(function () {
                seccionFormulario.classList.add('oculto');
                window.scrollTo(0, 0);
                seccionMonumento.classList.remove('oculto');
                seccionMonumento.classList.add('desvanecer');
                setTimeout(function () {
                    seccionMonumento.classList.remove('desvanecer');
                }, 100);
            }, 500);
        })
        .catch(function (error) {
            console.error('Error al enviar datos:', error);
        });
});