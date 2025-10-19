// Anexa uma imagem na tela.
// Pega os elementos
        const input = document.getElementById("inputImagem");
        const preview = document.getElementById("preview");

        // Quando a pessoa escolher um arquivo...
        input.addEventListener("change", function() {
            const arquivo = this.files[0]; // Pega o primeiro arquivo selecionado

            if (arquivo) {
                const leitor = new FileReader(); // Cria um leitor de arquivos

                leitor.addEventListener("load", function() {
                    preview.setAttribute("src", this.result); // Coloca a imagem no <img>
                    preview.style.display = "block"; // Mostra a imagem
                });

                leitor.readAsDataURL(arquivo); // Lê o arquivo como URL de imagem
            }
        });