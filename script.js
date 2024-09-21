window.onload = function () {
    const canvas = document.getElementById('girasolCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;

    let solPosX = 50;
    let solPosY = 80;
    let angle = 0;

    // Configuración de las nubes
    const nubes = [
        { x: 100, y: 100, width: 120, height: 70 },
        { x: 300, y: 80, width: 150, height: 80 },
        { x: 500, y: 120, width: 110, height: 60 }
    ];

    // Animación del movimiento del sol y del girasol
    function moverSol() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibuja el cielo
        dibujarCielo();

        // Dibuja el sol (círculo amarillo)
        ctx.beginPath();
        ctx.arc(solPosX, solPosY, 40, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();

        // Calcula el ángulo entre el sol y el centro del girasol
        const deltaX = solPosX - 400;
        const deltaY = solPosY - 300;
        angle = Math.atan2(deltaY, deltaX);

        // Dibuja el girasol
        dibujarGirasol(angle);

        // Movimiento del sol en un bucle de izquierda a derecha
        solPosX += 1;
        if (solPosX > canvas.width) {
            solPosX = 0;
        }

        // Repite la animación
        requestAnimationFrame(moverSol);
    }

    // Función para dibujar el cielo y las nubes
    function dibujarCielo() {
        // Fondo azul cielo
        ctx.fillStyle = '#87CEEB'; // Color azul cielo
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibuja nubes
        ctx.fillStyle = '#FFFFFF'; // Color blanco para las nubes
        nubes.forEach(nube => {
            ctx.beginPath();
            ctx.ellipse(nube.x, nube.y, nube.width, nube.height, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        });
    }

    function dibujarGirasol(rotacion) {
        // Dibuja el centro del girasol (marrón oscuro) con sombra
        ctx.save();
        ctx.translate(400, 300); // Centro de la pantalla
        ctx.rotate(rotacion); // El girasol sigue la posición del sol
        ctx.beginPath();
        ctx.arc(0, 0, 70, 0, Math.PI * 2);
        ctx.fillStyle = '#4d2600'; // marrón oscuro
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0; // Desactiva la sombra después

        // Dibuja los pétalos del girasol (alargados y amarillos)
        for (let i = 0; i < 20; i++) {
            ctx.save();
            ctx.rotate((Math.PI / 10) * i); // Rota para cada pétalo
            ctx.beginPath();
            ctx.ellipse(0, -140, 30, 100, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#ffdd00'; // Amarillo para los pétalos
            ctx.fill();
            ctx.restore();
        }
        ctx.restore();

        // Dibuja el tallo (verde)
        ctx.beginPath();
        ctx.moveTo(400, 370);
        ctx.lineTo(400, 600);
        ctx.lineWidth = 16;
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.closePath();

        // Dibuja las hojas del tallo con sombreado
        // Hoja izquierda
        ctx.beginPath();
        ctx.moveTo(400, 450);
        ctx.quadraticCurveTo(350, 500, 380, 520);
        ctx.quadraticCurveTo(390, 490, 400, 480);
        ctx.fillStyle = 'green';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.closePath();

        // Hoja derecha
        ctx.beginPath();
        ctx.moveTo(400, 500);
        ctx.quadraticCurveTo(450, 550, 420, 570);
        ctx.quadraticCurveTo(410, 540, 400, 530);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    }

    // Inicia la animación
    moverSol();
};
