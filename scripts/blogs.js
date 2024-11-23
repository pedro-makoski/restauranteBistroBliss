const blogs_place = document.querySelector('#blogs .components')

mudarLayout('./scripts/blog-itens.json', TEXTO_DE_SUMICO, false, null, false, () => {}, '<article class="blog"><a href="{path}" target="_self" rel="next"><div class="title"><h3>{title}</h3><p class="date">{date}</p></div><img src="{imgUrl}"></a></article>', blogs_place, [], false, 0);

const input = document.getElementById("search");

input.addEventListener('input', () => {
    mudarLayout('./scripts/blog-itens.json', TEXTO_DE_SUMICO, true, input, false, () => {}, '<article class="blog"><a href="{path}" target="_self" rel="next"><div class="title"><h3>{title}</h3><p class="date">{date}</p></div><img src="{imgUrl}"></a></article>', blogs_place, ["title"], false, 0);
})