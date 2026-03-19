function loadCategories (){
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
}

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
  .then(Response => Response.json())
  .then(data => displayVideos(data.videos))
}


function displayCategories (categories){
  // get the container
  const categoryContainer = document.getElementById("category-container")

  // loop operation on array of object
  for(let cat of categories){
    // console.log(cat)
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
    categoryContainer.appendChild(categoryDiv);
  } 
}

// {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }

const displayVideos = (videos) => {
  console.log(videos);
  const videoContainer = document.getElementById("")

} 


loadCategories();
loadVideos();