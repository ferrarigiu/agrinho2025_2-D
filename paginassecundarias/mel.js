const canvas = document.getElementById('melCanvas');
const ctx = canvas.getContext('2d');


let apples = []; // Array para armazenar as maçãs
const numApples = 20; // Número de maçãs para um efeito sutil
const appleSizeMin = 30; // Tamanho mínimo da maçã (para a imagem)
const appleSizeMax = 50; // Tamanho máximo da maçã (para a imagem)
const appleSpeedMin = 0.2; // Velocidade mínima da maçã
const appleSpeedMax = 1; // Velocidade máxima da maçã


// URL da imagem da maçã (agora um caminho relativo para um arquivo local)
const appleImageUrl = 'img/melf.png'; // Altere para o nome e caminho do seu arquivo de imagem


// Função para inicializar o tamanho do canvas
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


// Construtor para uma "mel" individual
function Apple() {
    this.image = new Image(); // Cria um novo objeto de imagem
    this.image.src = appleImageUrl; // Define a fonte da imagem
    this.image.onerror = () => { // Fallback para caso a imagem não carregue
        console.error("Erro ao carregar a imagem da maçã. Usando um quadrado como fallback.");
        this.isImageLoaded = false;
    };
    this.image.onload = () => {
        this.isImageLoaded = true;
    };
    this.isImageLoaded = false; // Flag para saber se a imagem foi carregada


    this.reset();
}


Apple.prototype.reset = function() {
    this.x = Math.random() * canvas.width; // Posição X aleatória
    this.y = -Math.random() * canvas.height; // Começa acima da tela
    this.size = Math.random() * (appleSizeMax - appleSizeMin) + appleSizeMin; // Tamanho aleatório
    this.speed = Math.random() * (appleSpeedMax - appleSpeedMin) + appleSpeedMin; // Velocidade aleatória
    this.opacity = Math.random() * 0.3 + 0.3; // Opacidade aleatória para variação (mais transparente)
    // A rotação foi removida para imagens, pois pode não parecer natural
};


Apple.prototype.draw = function() {
    ctx.save(); // Salva o estado atual do canvas
    ctx.globalAlpha = this.opacity; // Define a opacidade para a imagem
   
    if (this.isImageLoaded) {
        // Desenha a imagem da maçã
        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else {
        // Fallback: desenha um quadrado se a imagem não carregar
        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }


    ctx.restore(); // Restaura o estado anterior do canvas
};


Apple.prototype.update = function() {
    this.y += this.speed; // Move a maçã para baixo


    // Se a maçã sair da tela, reseta sua posição para o topo
    if (this.y - this.size > canvas.height) {
        this.reset();
    }
};


// Inicializa as maçãs
function initApples() {
    for (let i = 0; i < numApples; i++) {
        apples.push(new Apple());
    }
}


// Função principal de animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas


    apples.forEach(apple => {
        apple.update();
        apple.draw();
    });


    requestAnimationFrame(animate); // Chama a próxima moldura de animação
}


// Event Listeners
window.addEventListener('resize', setCanvasSize); // Redimensiona o canvas ao redimensionar a janela


// Inicializa o canvas e começa a animação quando a janela carrega
window.onload = function() {
    setCanvasSize();
    initApples();
    animate();
};