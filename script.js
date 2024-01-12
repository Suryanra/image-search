const accesskey = 'c5AIUem8pfZ39C0UsST-TtH6e5Huh0Fw_C54RnEls_g';
const searchform = document.getElementById('search-engine');
const searchbox = document.getElementById('search-box');
const searchresult = document.getElementById('search-result');
const showmorebtn = document.getElementById('show-more-btn');
let keyword = "";
let page = 1;
let likedImages = [];
loadLikedImages();

// ======================show liked images
const fbutton=document.getElementById('favourite');
const fcontainer=document.getElementById('fcontainerid');
fbutton.addEventListener('click',showlikedimages);

function showlikedimages(){
    loadLikedImages();
    fcontainer.innerHTML=" "
    fcontainer.style.backgroundColor="#1A2228"
    likedImages.forEach((url)=>{
        const image = document.createElement("img");
        image.classList.add("imageclass" )
        image.classList.add("imageclass1" )
        // image.classList.add("imageclass imageclass1" ); // Add the "imageclass" to the image element
        const divout = document.createElement("div");
        image.src = url
        divout.appendChild(image)
        fcontainer.appendChild(divout)
    })
}



// ======================



// ===============================
function likeImage(imageurl) {
    // const index = likedImages.indexOf(imageId);
    if (imageurl && likedImages.indexOf(imageurl)===-1) {
        likedImages.push(imageurl)
        console.log(likedImages);
        saveLikedImages();
    } 

    // You can update the UI to reflect the liked status, e.g., change button text or color
    updateUI();
}

function updateUI() {
    // Code to update the UI based on the likedImages array
}


// Save likedImages to local storage
function saveLikedImages() {
    localStorage.setItem('likedImages', JSON.stringify(likedImages));
}

// Retrieve likedImages from local storage
function loadLikedImages() {
    const savedLikedImages = localStorage.getItem('likedImages');
    likedImages = savedLikedImages ? JSON.parse(savedLikedImages) : [];
}

// ===============================
async function searchimages(){
    keyword = searchbox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=28`;
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchresult.innerHTML = "";
    }

    const results = data.results;

    results.forEach(result => {
        const image = document.createElement("img");
        image.classList.add("imageclass"); // Add the "imageclass" to the image element
        const divout = document.createElement("div");
        image.src = result.urls.small;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
// ===============>adding liked images===============>
        const likeButton = document.createElement("button");
        likeButton.innerText = "Like";
        likeButton.addEventListener("click", () => {
    // Call a function to handle liking the image
    likeImage(result.urls.small); // Assuming result.id uniquely identifies the image
    
});
divout.appendChild(likeButton);
// ==============================>

        searchresult.appendChild(divout);
        divout.appendChild(imagelink);
        imagelink.appendChild(image);

    });
    showmorebtn.style.display = "block";
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchimages();
});

showmorebtn.addEventListener("click", () => {
    page++;
    searchimages();
});
// ===============================
