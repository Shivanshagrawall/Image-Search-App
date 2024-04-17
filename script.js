const accessKey = "j8Ow__M7uAhi-hMRgb0l3RWfgL6bucf9_quTesYUx1A";
const form = document.querySelector('form');
const imageContainer = document.querySelector('.image-container');
const inputBox = document.querySelector('.input-box');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
const page = 1;

const fetchImage = async (query, pageNo) => {

    try {
        if (pageNo == 1) {
            imageContainer.innerHTML = "";
        }
        const url = `https://api.unsplash.com/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        console.log("2");

        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length <= 0) {
            imageContainer.innerHTML = `<h2>No Image Found!!!</h2>`;
        }
        else {
            console.log("3");
            data.value.forEach(photo => {
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

                //creating overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                console.log("4");

                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;

                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
                imageContainer.appendChild(imageElement);

            });
            if (data.total_pages === pageNo) {
                loadMoreBtn.style.display = "none";
            } else {
                loadMoreBtn.style.display = "block";
            }

            console.log(data);
        }
    } catch (error) {
        imageContainer.innerHTML = `<h2>Failed to load Images. Please Try Later</h2>`
    }

}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputText = inputBox.value.trim();
    if (inputText != "") {
        console.log("1");
        fetchImage(inputText, page);
    } else {
        imageContainer.innerHTML = `<h2>Please Enter a Search Query.</h2>`;
    }

})


loadMoreBtn.addEventListener('click', () => {
    fetchImage(inputBox.value.trim(), ++page);
})