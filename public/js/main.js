// ========== SISTEMA DE TOASTS ==========
function mostrarToast(mensaje, tipo = 'info', duracion = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `<span class="toast-message">${mensaje}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('removiendo');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duracion);
}

// ========== SELECTS PERSONALIZADOS CON VALIDACIÓN ==========
const selectsCustom = document.querySelectorAll('.select-custom');

selectsCustom.forEach(function (select) {
    const selected = select.querySelector('.select-selected');
    const opciones = select.querySelector('.select-opciones');
    const input = select.querySelector('input[type="hidden"]');
    const fieldName = select.getAttribute('data-field');

    // Click para abrir/cerrar
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

    // Seleccionar opción
    opciones.querySelectorAll('li').forEach(function (li) {
        li.addEventListener('click', function () {
            const valor = li.dataset.value;
            selected.textContent = li.textContent;
            input.value = valor;
            opciones.querySelectorAll('li').forEach(l => l.classList.remove('seleccionado'));
            li.classList.add('seleccionado');
            opciones.classList.add('oculto');
            selected.classList.remove('abierto');

            // Validación visual
            if (valor) {
                select.classList.add('validado');
                select.classList.remove('error');
            } else {
                select.classList.remove('validado');
                select.classList.add('error');
            }

            // Mostrar toast de selección
            if (valor) {
                const labels = {
                    'edad': 'Rango de edad',
                    'procedencia': 'Procedencia',
                    'tipo_visitante': 'Tipo de visitante'
                };
                mostrarToast(`${labels[fieldName]} seleccionado`, 'success', 1500);
            }
        });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.select-custom')) {
            selectsCustom.forEach(function (select) {
                select.querySelector('.select-opciones').classList.add('oculto');
                select.querySelector('.select-selected').classList.remove('abierto');
            });
        }
    });
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
const btnSubmit = document.getElementById('btn-submit');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const edad = document.querySelector('input[name="edad"]').value;
    const procedencia = document.querySelector('input[name="procedencia"]').value;
    const tipoVisitante = document.querySelector('input[name="tipo_visitante"]').value;

    // Validación
    if (!edad || !procedencia || !tipoVisitante) {
        mostrarToast('Por favor completa todos los campos antes de continuar', 'error', 4000);
        return;
    }

    // Mostrar estado de carga
    btnSubmit.classList.add('cargando');
    btnSubmit.disabled = true;
    mostrarToast('Enviando datos...', 'info');

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
            mostrarToast('¡Gracias por completar el formulario! 🎉', 'success', 3000);
            
            // Animación de transición
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
            mostrarToast('Error al enviar datos. Intenta de nuevo.', 'error', 4000);
            btnSubmit.classList.remove('cargando');
            btnSubmit.disabled = false;
        });
});

// ========== CARRUSEL MEJORADO ==========
const imagenes = [
    'img/Alejado.jpeg',
    'img/vistaIzquierda.jpeg',
    'img/vistaDerecha.jpeg',
    'img/closeUp.jpeg'
];

let indiceActual = 0;
let autoplayInterval;
const carruselImg = document.getElementById('carrusel-img');
const puntos = document.querySelectorAll('.punto');
let touchStartX = 0;
let touchEndX = 0;

function cambiarImagen(nuevo) {
    if (carruselImg) {
        carruselImg.style.opacity = '0';
        setTimeout(function () {
            indiceActual = (nuevo + imagenes.length) % imagenes.length;
            carruselImg.src = imagenes[indiceActual];
            carruselImg.style.opacity = '1';
            puntos.forEach((p, i) => p.classList.toggle('activo', i === indiceActual));
        }, 300);
    }
    resetearAutoplay();
}

function resetearAutoplay() {
    clearInterval(autoplayInterval);
    iniciarAutoplay();
}

function iniciarAutoplay() {
    autoplayInterval = setInterval(function () {
        cambiarImagen(indiceActual + 1);
    }, 6000);
}

// Botones del carrusel
const btnDerecha = document.querySelector('.carrusel-btn.derecha');
const btnIzquierda = document.querySelector('.carrusel-btn.izquierda');

if (btnDerecha) {
    btnDerecha.addEventListener('click', function () {
        cambiarImagen(indiceActual + 1);
    });
}

if (btnIzquierda) {
    btnIzquierda.addEventListener('click', function () {
        cambiarImagen(indiceActual - 1);
    });
}

// Puntos del carrusel
puntos.forEach(function (punto, i) {
    punto.addEventListener('click', function () {
        cambiarImagen(i);
    });
});

// Navegación con teclado
document.addEventListener('keydown', function (e) {
    if (seccionMonumento.classList.contains('oculto')) return;
    
    if (e.key === 'ArrowRight') {
        cambiarImagen(indiceActual + 1);
    } else if (e.key === 'ArrowLeft') {
        cambiarImagen(indiceActual - 1);
    }
});

// Swipe/Drag del carrusel
if (carruselImg) {
    carruselImg.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    carruselImg.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        detectarSwipe();
    });

    carruselImg.addEventListener('mousedown', function (e) {
        touchStartX = e.screenX;
        carruselImg.classList.add('dragging');
    });

    document.addEventListener('mouseup', function () {
        carruselImg.classList.remove('dragging');
    });

    carruselImg.addEventListener('mousemove', function (e) {
        if (e.buttons === 1) {
            touchEndX = e.screenX;
        }
    });

    document.addEventListener('mouseup', function () {
        if (touchStartX && touchEndX) {
            detectarSwipe();
            touchStartX = 0;
            touchEndX = 0;
        }
    });
}

function detectarSwipe() {
    const diferencia = touchStartX - touchEndX;
    if (Math.abs(diferencia) > 50) {
        if (diferencia > 0) {
            cambiarImagen(indiceActual + 1);
        } else {
            cambiarImagen(indiceActual - 1);
        }
    }
}

// Iniciar autoplay
if (carruselImg) {
    iniciarAutoplay();
}

// ========== QUIZ INTERACTIVO ==========
const preguntas = [
    {
        pregunta: "¿Cuál es el nombre en wayuunaiki del Palabrero?",
        opciones: [
            { texto: "Putchipuu", correcta: true },
            { texto: "Malouma", correcta: false },
            { texto: "Wayuu Ipaki", correcta: false },
            { texto: "Ahurua", correcta: false }
        ]
    },
    {
        pregunta: "¿En qué año fue declarado patrimonio de la humanidad el sistema normativo Wayúu?",
        opciones: [
            { texto: "2005", correcta: false },
            { texto: "2010", correcta: true },
            { texto: "2015", correcta: false },
            { texto: "2020", correcta: false }
        ]
    },
    {
        pregunta: "¿Cuál es la función principal del Palabrero en la cultura Wayúu?",
        opciones: [
            { texto: "Enseñar idiomas", correcta: false },
            { texto: "Mediar y resolver conflictos mediante el diálogo", correcta: true },
            { texto: "Dirigir rituales religiosos", correcta: false },
            { texto: "Gobernar la comunidad", correcta: false }
        ]
    },
    {
        pregunta: "¿Dónde se encuentra el monumento al Palabrero?",
        opciones: [
            { texto: "Santa Marta", correcta: false },
            { texto: "Riohacha, La Guajira", correcta: true },
            { texto: "Cartagena", correcta: false },
            { texto: "Maracaibo", correcta: false }
        ]
    }
];

function renderizarQuiz() {
    const container = document.getElementById('quiz-preguntas');
    if (!container) return;

    container.innerHTML = '';
    preguntas.forEach((pregunta, index) => {
        const div = document.createElement('div');
        div.className = 'pregunta-quiz';
        div.innerHTML = `
            <h3>${index + 1}. ${pregunta.pregunta}</h3>
            <div class="opciones-quiz">
                ${pregunta.opciones.map((opcion, oIndex) => `
                    <div class="opcion-quiz">
                        <input type="radio" id="q${index}o${oIndex}" name="pregunta${index}" value="${oIndex}" data-correcta="${opcion.correcta}">
                        <label for="q${index}o${oIndex}">${opcion.texto}</label>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(div);
    });
}

// Enviar quiz
const btnEnviarQuiz = document.getElementById('btn-enviar-quiz');
if (btnEnviarQuiz) {
    btnEnviarQuiz.addEventListener('click', function () {
        const respuestas = {};
        let correctas = 0;

        for (let i = 0; i < preguntas.length; i++) {
            const selected = document.querySelector(`input[name="pregunta${i}"]:checked`);
            if (!selected) {
                mostrarToast(`Por favor responde la pregunta ${i + 1}`, 'error', 3000);
                return;
            }
            const esCorrecta = selected.getAttribute('data-correcta') === 'true';
            respuestas[i] = esCorrecta;
            if (esCorrecta) correctas++;
        }

        // Mostrar resultado
        const porcentaje = Math.round((correctas / preguntas.length) * 100);
        const resultado = document.getElementById('quiz-resultado');
        
        let mensaje = '';
        if (porcentaje === 100) {
            mensaje = '¡Excelente! Eres un experto en la cultura Wayúu. 🏆';
        } else if (porcentaje >= 75) {
            mensaje = '¡Muy bien! Tienes un gran conocimiento sobre el Palabrero Wayúu. 👏';
        } else if (porcentaje >= 50) {
            mensaje = 'Buen intento! Aprendiste bastante sobre esta fascinante cultura. 📚';
        } else {
            mensaje = 'No desistas, hay mucho más para aprender sobre la cultura Wayúu. 💡';
        }

        resultado.innerHTML = `
            <h3>Tu resultado</h3>
            <div class="puntuacion">${correctas}/${preguntas.length}</div>
            <p style="font-size: 1.1rem; color: #DAA520; margin-bottom: 12px;">${porcentaje}%</p>
            <p class="mensaje">${mensaje}</p>
        `;
        resultado.classList.remove('oculto');
        mostrarToast(`Quiz completado: ${correctas}/${preguntas.length} respuestas correctas`, 'success', 3000);
        btnEnviarQuiz.disabled = true;
        btnEnviarQuiz.style.opacity = '0.5';
    });
}

// Renderizar quiz al cargar
renderizarQuiz();

// ========== ALGORITMO DE DIJKSTRA Y MAPA ==========

// Definir locaciones/monumentos en Riohacha
const locaciones = [
    { id: 'monumento', nombre: 'Monumento Palabrero', lat: 12.4269, lng: -71.6337 },
    { id: 'catedral', nombre: 'Catedral de Riohacha', lat: 12.4294, lng: -71.6298 },
    { id: 'malecon', nombre: 'Malecón de Riohacha', lat: 12.4285, lng: -71.6250 },
    { id: 'plaza', nombre: 'Plaza Principal', lat: 12.4304, lng: -71.6310 },
    { id: 'puerto', nombre: 'Puerto de Riohacha', lat: 12.4310, lng: -71.6180 },
    { id: 'mercado', nombre: 'Mercado Central', lat: 12.4320, lng: -71.6285 }
];

// Matriz de distancias en metros (Riohacha es una ciudad pequeña)
const distancias = {
    'monumento-catedral': 0.5,
    'monumento-malecon': 1.0,
    'monumento-plaza': 0.3,
    'monumento-puerto': 1.5,
    'monumento-mercado': 0.7,
    'catedral-malecon': 0.6,
    'catedral-plaza': 0.2,
    'catedral-puerto': 1.2,
    'catedral-mercado': 0.4,
    'malecon-plaza': 0.8,
    'malecon-puerto': 0.9,
    'malecon-mercado': 1.1,
    'plaza-puerto': 1.3,
    'plaza-mercado': 0.5,
    'puerto-mercado': 1.2
};

function getDistancia(id1, id2) {
    const key1 = id1 < id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
    if (distancias[key1]) return distancias[key1];
    
    // Calcular distancia Haversine como respaldo (en km)
    const loc1 = locaciones.find(l => l.id === id1);
    const loc2 = locaciones.find(l => l.id === id2);
    
    const R = 6371; // Radio de la Tierra en km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distancia = R * c;
    
    // Convertir a km si es muy pequeño (es dentro de una ciudad)
    return parseFloat(distancia.toFixed(2));
}

// Algoritmo de Dijkstra
function dijkstra(origen, destino) {
    const distanciasMin = {};
    const visitados = new Set();
    const rutaPrevio = {};
    
    // Inicializar distancias
    locaciones.forEach(loc => {
        distanciasMin[loc.id] = Infinity;
    });
    distanciasMin[origen] = 0;
    
    while (visitados.size < locaciones.length) {
        let nodoActual = null;
        let minDistancia = Infinity;
        
        // Encontrar nodo no visitado con menor distancia
        for (const loc of locaciones) {
            if (!visitados.has(loc.id) && distanciasMin[loc.id] < minDistancia) {
                nodoActual = loc.id;
                minDistancia = distanciasMin[loc.id];
            }
        }
        
        if (nodoActual === null || minDistancia === Infinity) break;
        
        visitados.add(nodoActual);
        
        // Actualizar distancias de vecinos
        for (const vecino of locaciones) {
            if (!visitados.has(vecino.id)) {
                const distancia = getDistancia(nodoActual, vecino.id);
                const nuevaDistancia = distanciasMin[nodoActual] + distancia;
                
                if (nuevaDistancia < distanciasMin[vecino.id]) {
                    distanciasMin[vecino.id] = nuevaDistancia;
                    rutaPrevio[vecino.id] = nodoActual;
                }
            }
        }
    }
    
    // Reconstruir ruta
    const ruta = [];
    let actual = destino;
    while (actual !== undefined) {
        ruta.unshift(actual);
        actual = rutaPrevio[actual];
    }
    
    return {
        ruta: ruta,
        distancia: distanciasMin[destino],
        valida: visitados.has(destino)
    };
}

// Variables del mapa
let mapa = null;
let markers = [];
let rutaPolyline = null;

function inicializarMapa() {
    // Coordenada central en Riohacha
    const centro = [12.4290, -71.6310];
    
    mapa = L.map('mapa').setView(centro, 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(mapa);
    
    // Agregar marcadores
    locaciones.forEach(loc => {
        const marker = L.circleMarker([loc.lat, loc.lng], {
            radius: 8,
            fillColor: loc.id === 'monumento' ? '#8B4513' : '#DAA520',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(mapa);
        
        marker.bindPopup(`<strong>${loc.nombre}</strong>`);
        marker.id = loc.id;
        markers.push(marker);
    });
}

// Inicializar selects de locaciones
function cargarLocaciones() {
    const selectOrigen = document.getElementById('origen');
    const selectDestino = document.getElementById('destino');
    
    locaciones.forEach(loc => {
        const opt1 = document.createElement('option');
        opt1.value = loc.id;
        opt1.textContent = loc.nombre;
        selectOrigen.appendChild(opt1);
        
        const opt2 = document.createElement('option');
        opt2.value = loc.id;
        opt2.textContent = loc.nombre;
        selectDestino.appendChild(opt2);
    });
    
    // Seleccionar el monumento por defecto como origen y malecón como destino
    selectOrigen.value = 'monumento';
    selectDestino.value = 'malecon';
}

// Calcular y mostrar ruta
document.addEventListener('DOMContentLoaded', function() {
    inicializarMapa();
    cargarLocaciones();
    
    const btnCalcular = document.getElementById('btn-calcular-ruta');
    btnCalcular.addEventListener('click', function() {
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        
        if (!origen || !destino) {
            mostrarToast('Selecciona origen y destino', 'error', 3000);
            return;
        }
        
        if (origen === destino) {
            mostrarToast('El origen y destino deben ser diferentes', 'error', 3000);
            return;
        }
        
        btnCalcular.classList.add('cargando');
        btnCalcular.disabled = true;
        
        setTimeout(() => {
            const resultado = dijkstra(origen, destino);
            
            if (!resultado.valida) {
                mostrarToast('No hay ruta disponible entre estos puntos', 'error', 3000);
                btnCalcular.classList.remove('cargando');
                btnCalcular.disabled = false;
                return;
            }
            
            // Dibujar ruta en el mapa
            if (rutaPolyline) {
                mapa.removeLayer(rutaPolyline);
            }
            
            const puntos = resultado.ruta.map(id => {
                const loc = locaciones.find(l => l.id === id);
                return [loc.lat, loc.lng];
            });
            
            rutaPolyline = L.polyline(puntos, {
                color: '#8B4513',
                weight: 3,
                opacity: 0.8,
                dashArray: '5, 5'
            }).addTo(mapa);
            
            // Mostrar información
            const infoDist = document.getElementById('info-distancia');
            infoDist.innerHTML = `<i>📍 Distancia total: ${resultado.distancia.toFixed(1)} km</i>`;
            infoDist.classList.remove('oculto');
            
            // Mostrar detalles de la ruta
            mostrarDetallesRuta(resultado.ruta, resultado.distancia);
            
            // Animar el mapa
            const bounds = L.latLngBounds(puntos);
            mapa.fitBounds(bounds, { padding: [50, 50] });
            
            btnCalcular.classList.remove('cargando');
            btnCalcular.disabled = false;
            
            mostrarToast(`Ruta calculada: ${resultado.distancia.toFixed(1)} km`, 'success', 3000);
        }, 500);
    });
});

function mostrarDetallesRuta(ruta, distancia) {
    const detalles = document.getElementById('detalles-ruta');
    const pasosDiv = document.getElementById('pasos-ruta');
    const estadisticasDiv = document.getElementById('estadisticas-ruta');
    
    // Generar pasos
    let pasos = '<ol>';
    let distanciaAcumulada = 0;
    
    for (let i = 0; i < ruta.length - 1; i++) {
        const locOrigen = locaciones.find(l => l.id === ruta[i]);
        const locDestino = locaciones.find(l => l.id === ruta[i + 1]);
        const distParcial = getDistancia(ruta[i], ruta[i + 1]);
        distanciaAcumulada += distParcial;
        
        pasos += `<li><strong>${locOrigen.nombre}</strong> → <strong>${locDestino.nombre}</strong> (${distParcial.toFixed(1)} km)</li>`;
    }
    pasos += '</ol>';
    
    pasosDiv.innerHTML = pasos;
    
    // Estadísticas
    estadisticasDiv.innerHTML = `
        <div class="estadistica-item">
            <div class="label">Paradas</div>
            <div class="valor">${ruta.length}</div>
        </div>
        <div class="estadistica-item">
            <div class="label">Distancia Total</div>
            <div class="valor">${distancia.toFixed(1)} km</div>
        </div>
    `;
    
    detalles.classList.remove('oculto');
}