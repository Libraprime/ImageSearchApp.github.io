let inputData = "";
let page = 1;

const searchImages = async () => {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if(page === 1) {
        resultsEl.innerHTML = "";
    }
    
    const result = data.results;
    
    result.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        resultsEl.appendChild(imageWrapper);
    })
    
    page++
    
    
    if(page > 1) {
        showMoreEl.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMoreEl.addEventListener("click", () => {
    searchImages();
})