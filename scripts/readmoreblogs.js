const place = document.querySelector('.contents .itens')
const actual = document.querySelector("article h1").getAttribute("data-name");

mudarLayout('../scripts/blog-itens.json', TEXTO_DE_SUMICO, false, null, false, () => {}, '<article class="blog"><a href="{path}" target="_self" rel="next"><div class="title"><h3>{title}</h3><p class="date">{date}</p></div><img src="{imgUrl}"></a></article>', place, [], true, 4, "../", ["imgUrl", "path"], actual, "title");