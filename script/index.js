const showLoader = () => {
  document.getElementById("loading").classList.remove("hidden")
  document.getElementById("video-container").classList.add("hidden")

}
const hideLoader = () => {
  document.getElementById("loading").classList.add("hidden")
  document.getElementById("video-container").classList.remove("hidden")

}

function removeActiveClass (){
  const activeButtons = document.getElementsByClassName("active")
    for(let btn of activeButtons){
      btn.classList.remove("active");
    }
}

function loadCategories (){
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
}

const loadVideos = (searchText = "") => {
  showLoader()

  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then(Response => Response.json())
  .then(data => {
    removeActiveClass();

      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
  })

  .catch(err => {
        console.error(err);
        hideLoader();
    });

}

const loadCategoryVideos = (id) => {
  const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`)
      // console.log(clickedButton);
      clickedButton.classList.add("active")
      displayVideos(data.category)
    })

    .catch(err => {
        console.error(err);
        hideLoader();
    });
}

const loadVideoDetails = (videoId) => {
  

  const url = `
  https://openapi.programming-hero.com/api/phero-tube/video/${videoId}
  `;
  fetch(url)
  .then(res => res.json())
  .then(data => displayVideoDetails(data.video));
}

const displayVideoDetails = (video) => {
  console.log(video)
  document.getElementById("video_details").showModal()
  const detailsContainer = document.getElementById("details-container")
   detailsContainer.innerHTML =`
   <div class="card bg-base-100 image-full">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="image" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p class="text-gray-400">${video.others.views} views</p>
    <p class="text-gray-400">${video.description} views</p>
  </div>
</div>
   `

}


function displayCategories (categories){
  // get the container
  const categoryContainer = document.getElementById("category-container")

  // loop operation on array of object
  for(let cat of categories){
    // console.log(cat)
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id ="btn-${cat.category_id}" onClick = "loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
    categoryContainer.appendChild(categoryDiv);
  } 
}

const displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if(videos.length == 0){
    videoContainer.innerHTML = `
      <div class="py-64 col-span-full flex flex-col justify-center items-center">
          <img src="./assets/Icon.png" alt="">
          <h2 class="text-2xl font-bold">Oops!! There is no content here</h2>
        </div>
    `
    return;
  }

  videos.forEach(video => {
    // console.log(video)
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
      <div class="card bg-base-100">
  <figure class="relative ">
    <img class ="w-full h-[230px] object-cover rounded-md"
      src="${video.thumbnail}"
      alt="Shoes" />
      <span class="absolute bg-black text-white rounded-sm text-sm bottom-2 right-4 px-2 ">3hrs 56 min ago</span>
  </figure>
  <div class=" flex gap-5 pt-3">
    <div class="profile">
      <div class="avatar">
        <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring-offset-2">
          <img src="${video.authors[0].profile_picture}" />
          </div>
        </div>
    </div>
      <div class="intro">
      <h2 class="text-sm font-semibold">${video.title}</h2>
      <p class="flex gap-2 text-gray-400">${video.authors[0].profile_name} 
        ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="./assets/icons8-verified-48.png" alt=""></p>` : ``}
      <p class="text-gray-400">${video.others.views} views</p>
      </div>
    </div>
    <button onClick = loadVideoDetails("${video.video_id}") class="btn btn-block">Show details</button>
  </div>
    `
    videoContainer.appendChild(videoCard);
  });
  hideLoader();
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e .target.value;
  loadVideos(input);
})


loadCategories();