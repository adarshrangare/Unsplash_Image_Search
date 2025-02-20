let AccessKey = "KZcuWHCOlnqJ6vd582ZUgzEPiSjxB0Cvp8EIGiZEc1Y";
const searchBox = document.querySelector("#searchBox");
const form = document.querySelector("form");
const imageContainer = document.querySelector(".imageContainer");
let page = 1;
let searchKeyword = "";
let url = "";
let observer;

function loadImages() {
    searchKeyword = searchBox.value;
    url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchKeyword}&client_id=${AccessKey}&per_page=12`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                alert("No images found");
                return;
            }
            
            data.results.forEach(result => {
                const { alt_description, urls, links } = result;
                const image = document.createElement("img");
                image.src = urls.small;
                image.alt = alt_description;
                
                const imageSource = document.createElement("a");
                imageSource.href = links.html;
                imageSource.target = "_blank";
                
                imageSource.appendChild(image);
                imageContainer.appendChild(imageSource);
            });
            
            observeLastImage();
        })
        .catch(error => console.error("Error fetching images:", error));
}

function observeLastImage() {
    const images = document.querySelectorAll(".imageContainer img");
    if (images.length > 0) {
        const lastImage = images[images.length - 1];
        if (observer) observer.disconnect();

        observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                page++;
                loadImages();
            }
        }, { threshold: 0.5 });

        observer.observe(lastImage);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!searchBox.value) {
        alert("Please enter an image search term");
        return;
    }
    imageContainer.innerHTML = "";
    page = 1;
    loadImages();
});
