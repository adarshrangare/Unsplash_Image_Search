let AccessKey = "KZcuWHCOlnqJ6vd582ZUgzEPiSjxB0Cvp8EIGiZEc1Y";
const searchBox = document.querySelector("#searchBox");
const form = document.querySelector("form");
const imageContainer = document.querySelector(".imageContainer");
const showMore = document.querySelector("#showMore");
let page =1;
let searchKeyword ="";
let url ="";

function loadImages(){

    searchKeyword = searchBox.value;

    // if(page==1){
        
    // }

    url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchKeyword}&client_id=${AccessKey}&per_page=12`

    fetch(url).then(response => response.json()).then(data =>data.results).then(results=>{

        console.log(results);

        results.map(result=>{


            const {alt_description, urls, links} = result;

            console.log({alt_description, urls, links});

            const image = document.createElement("img");

            image.src = urls.small;
            image.alt = alt_description;

            const imageSource = document.createElement("a");
            imageSource.href = links.html;
            imageSource.target = "_blank";
            
            imageSource.appendChild(image);

            imageContainer.appendChild(imageSource);

        })

    });

    showMore.style.display ="block";

}


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    // console.log(searchBox.value);
    if(!searchBox.value){
        alert("Please Enter the Name or Type of Image");
        return;
    }
    imageContainer.innerHTML = "";
    loadImages();
})


showMore.addEventListener("click",(e)=>{

    page++;

    loadImages();

})