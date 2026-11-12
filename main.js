const formulario = document.getElementById("formPoke");

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault(); // evita que a página recarregue

    const id = document.getElementById("idPoke").value;

    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await resposta.json();

    document.getElementById("nomePokemon").textContent = pokemon.name;
    document.getElementById("imgPoke").src = pokemon.sprites.front_default;
    document.getElementById("basePoke").textContent = `Experiência base: ${pokemon.base_experience}`;
    document.getElementById("alturaPoke").textContent = `Altura: ${pokemon.height}`;
    document.getElementById("pesoPoke").textContent = `Peso: ${pokemon.weight}`;

    // Monta as barras de status
    const areaStats = document.getElementById("statsPoke");
    areaStats.innerHTML = "";

    pokemon.stats.forEach(function (item) {
        const linha = document.createElement("div");
        linha.classList.add("stat");

        const nome = document.createElement("span");
        nome.textContent = item.stat.name;

        const barra = document.createElement("div");
        barra.classList.add("stat-barra");

        const preenchimento = document.createElement("div");
        preenchimento.classList.add("stat-preenchimento");
        // 255 é o valor máximo possível de um stat base; a barra usa essa proporção
        preenchimento.style.width = `${(item.base_stat / 255) * 100}%`;
        barra.appendChild(preenchimento);

        const valor = document.createElement("span");
        valor.classList.add("stat-valor");
        valor.textContent = item.base_stat;

        linha.append(nome, barra, valor);
        areaStats.appendChild(linha);
    });
});