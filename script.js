//You can edit ALL of the code here
let allEpisodes;
let inputElem;
let selectElem;
allEpisodes = getAllEpisodes();
// let allShow;
// let showId;
// let allShow = getAllShows();
let homeBtn = document.getElementById("home");
let episodeFrames = document.getElementById("frames")


function setup() {
  allShow = getAllShows();
  allShow.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return +1;
    }
  });
  populateShowSelect();
  // selectEpisode(allEpisodes);
  // showSearch(allShow);
//  makePageForShow(allShow);
  // showList();
  // console.log(allShow);

  // makePageForEpisodes(allEpisodes);
  inputElem = document.getElementById("input");
  inputElem.addEventListener("input", filterEpisodes)



  // fetch(`https://api.tvmaze.com/shows/${allShow[0].id}/episodes`)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     filterEpisodes(data);
  //     // makePageForEpisodes(data);
  //     // addOneEpisode(data);
  //     selectEpisode(data);
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   });
}

  function makePageForShow(info) {
    let showInfoDiv = document.createElement("div");
    showInfoDiv.className = "showInfoDiv";
    let showRating = document.createElement("span");
    showRating.innerHTML = `Rating:${show.rating.average}`;
    showInfoDiv.appendChild(showRating);
    let showGenres = document.createElement("span");
    showGenres.innerHTML = `Genres:${show.genres}`;
    showInfoDiv.appendChild(showGenres);
    let showStatus = document.createElement("span");
    showStatus.innerHTML = `Status:${show.status}`;
    showInfoDiv.appendChild(showStatus);
    let showRuntime = document.createElement("span");
    showRuntime.innerHTML = `Runtime:${show.runtime}`;
    showInfoDiv.appendChild(showRuntime);
    showDiv.appendChild(showInfoDiv);

    

  //     status.innerHTML = `Status:${show.status}`;
  //     rating.innerHTML = `Rating:${show.rating.average}`;
  //     runTime.innerHTML = `Runtime:${show.runtime}`;genres.innerHTML = `Genres:${show.genres}`;
  //     status.innerHTML = `Status:${show.status}`;
  //     rating.innerHTML = `Rating:${show.rating.average}`;
  //     runTime.innerHTML = `Runtime:${show.runtime}`;
    // const rootElem = document.getElementById("root");
    // rootElem.innerHTML = "";
    // showList.forEach((show) => {

      // let summaryContainer = document.createElement("section");
      // let h2Elem = document.createElement("h3");
      // let contentElem = document.createElement("article");
      // let mainElem = document.createElement("article");
      // let elem = document.createElement("article");
      // let option= document.createElement("option")
  //   let imageElem = document.createElement("img");
  //     let parElem = document.createElement("p");
  //     let genres = document.createElement("p");
  //     let status = document.createElement("p");
  //     let rating = document.createElement("p");
  //     let runTime = document.createElement("p");
  //     option.innerHTML = show.name;
      //      if (show.image) { imageElem.src = show.image.medium};
  //     parElem.innerHTML = show.summary;

  //     genres.innerHTML = `Genres:${show.genres}`;
  //     status.innerHTML = `Status:${show.status}`;
  //     rating.innerHTML = `Rating:${show.rating.average}`;
  //     runTime.innerHTML = `Runtime:${show.runtime}`;

  //   //  selectElem.appendChild(summaryContainer);
  //     summaryContainer.appendChild(h2Elem);
  //     summaryContainer.appendChild(contentElem);
  //     contentElem.appendChild(mainElem);
  //     contentElem.appendChild(elem);

  //     h2Elem.appendChild(option);
  //     mainElem.appendChild(imageElem);
  //     mainElem.appendChild(parElem);
  //     elem.appendChild(rating);
  //     elem.appendChild(genres);
  //     elem.appendChild(status);
  //     elem.appendChild(runTime);
  //     rootElem.appendChild(elem);
    // })
   
   makePageForShow(info);
   }

  // }
function populateShowSelect() {
  const selectShow = document.getElementById("select-show");
  allShow.forEach((show) => {
    let option = document.createElement("option");
    option.innerText = show.name;
    option.value = show.id;
    selectShow.appendChild(option);
  });
  selectShow.addEventListener("change", (e) => {
    let showId = e.target.value;
    console.log(showId);
    // episodeFrames.innerHTML = "";


    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        allEpisodes = data;
        filterEpisodes(allEpisodes);
        makePageForEpisodes(allEpisodes);
        // addOneEpisode(allEpisodes);
         selectEpisode(allEpisodes);

      })
      .catch(function (error) {
        console.log(error)
      });
  })

}




function filterEpisodes() {
  let lowerCase = inputElem.value.toLowerCase();
  let filteredEpisodes = allEpisodes.filter(function (episode) {
    if (episode.name.toLowerCase().includes(lowerCase) === true) {
      return true;
    }
    if (episode.summary.toLowerCase().includes(lowerCase) === true) {
      return true;
    }
    return false;
  });

  makePageForEpisodes(filteredEpisodes);
  document.getElementById("search").innerHTML =
    `Displaying ${filteredEpisodes.length}
   / ${allEpisodes.length} episodes`;
}



function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  episodeList.forEach(function (episode) {
    addOneEpisode(episode);
  });
}

function addOneEpisode(episode) {
  let divElem = document.createElement("div");
  let h2El = document.createElement("h2");
  let imgElem = document.createElement("img");
  let parElem = document.createElement("p");
  // let selectShow = document.createElement("select");
  // selectShow.className = "selectShow";
  h2El.innerHTML = `${episode.name}- S${String(episode.season).padStart(2, "0")}
    E${String(episode.number).padStart(2, "o")}`;
  imgElem.src = `${episode.image.medium}`;
  if (episode.image == null) {
    imgElem.src = "image is not available";
  } else {
    imgElem.src = episode.image.medium;
  }
  parElem.innerHTML = `${episode.summary}`;
  divElem.classList = "summaryContainer";
  document.getElementById("root").appendChild(divElem);
  divElem.appendChild(h2El);
  divElem.appendChild(imgElem);
  divElem.appendChild(parElem);


}

// function makePageForShow(showList) {
//   showList.forEach((show) => {
//     let summaryContainer= document.createElement("section");
//     let titleElem= document.createElement("article");
//     let contentElem = document.createElement("article");
//     let mainElem = document.createElement("article");
//     let elem = document.createElement("article");
//     let nameELem = document.createElement("P")
//     let imgElem = document.createElement("img");
//     let parElem = document.createElement("p");
//     let genres = document.createElement("par");
//     let status = document.createElement("par");
//     let rating = document.createElement("par");
//     let runTime = document.createElement("par");
    // let footer = document.createElement("div");
    // let showLink = document.createElement("link");
    // showLink.id = show;
    // showLink.addEventListener("click", (e) => {
    //   selectShow(e.target.value);
    //   selectElem.value = show.id;
    // });

    // nameELem = show.name;
    // imgElem.src = show.image.medium;
    // parElem.innerHTML = show.summary;

    // genres.innerHTML = `Genres:${show.genres}`;
    // status.innerHTML = `Status:${show.status}`;
    // rating.innerHTML = `Rating:${show.rating.average}`;
    // runTime.innerHTML = `Runtime:${show.runtime}`;
    //  h2El = show.name;
    // showLink.href = "#";
    //  imgElem.src = show.image.medium;
    // parElem.innerHTML = show.summary;
    // divElem.appendChild(summaryContainer);
    // summaryContainer.appendChild(titleElem);
    // summaryContainer.appendChild(contentElem);
    // contentElem.appendChild(mainElem);
    // contentElem.appendChild(elem);

    // titleElem.appendChild(nameELem);
    // mainElem.appendChild(imgElem);
    // mainElem.appendChild(parElem);
    // elem.appendChild(rating);
    // elem.appendChild(genres);
    // elem.appendChild(status);
    // elem.appendChild(runTime);
    // divElem.appendChild(footer);
    // h2El.appendChild(showLink);
//   })
// }
function showSearch(allShows) {
  selectShow.style.display = "";
  selectElem.style.display = "none";
  episodeFrames.innerHTML = "";
  // const rootElem = document.getElementById("root");
  // rootElem.innerHTML = "";
  inputElem.style.display = "none";
  allShows.forEach((show)=>{
    let showDiv = document.createElement("div");
    showDiv.className = showDiv;
    episodeFrames.appendChild(showDiv);
    let showTitle = document.createElement("h3");
    showTitle.id = show.id;
    showTitle.className = "showTitle";
    showTitle.innerHTML = show.name;
    showDiv.appendChild(showTitle);
    showTitle.addEventListener("click",()=>{
      selectShow.value = show.id;
      getData(show.id);
    })
  });
}
  

  function showImageAndSummaryPage(summary){
    let showImg = document.createElement("img");
    if (show.image) { imageElem.src = show.image.medium 
    }else{console.log(show.name)};

    showDiv.appendChild(showImg);
    show.summary = show.summary.replace("</p>"," ");
    show.summary = show.summary.replace("<p>", " ");
    show.summary = show.summary.replace("</b>", " ");
    show.summary = show.summary.replace("<b>", " ");
    let showSummary = document.createElement("span");
    let showSummaryDiv = document.createElement("div");
    showSummary.className = "showSummary";
    showSummary.innerText = show.summary;
    showSummaryDiv.appendChild(showSummary);
    showDiv.appendChild(showSummaryDiv);

  showImageAndSummaryPage(summary);
  }



// }



function selectEpisode(allEpisodes) {
  selectElem = document.getElementById("select-episodes");
  let showOption = document.createElement("option");
  showOption.value = 0;
  showOption.text = "Episodes";
  selectElem.appendChild(showOption);
   selectElem.innerHTML = "";
  for (let i = 0; i < allEpisodes.length; i++) {
    let showOption = document.createElement("option");
    showOption.value = allEpisodes.name;
    showOption.text = allEpisodes.name;
     showOption.value = i;
    showOption.innerHTML = `S${String(allEpisodes[i].season).padStart(2, "0")}  
    E${String(allEpisodes[i].number).padStart(2, "0")} -${allEpisodes[i].name}`;
    selectElem.appendChild(showOption);
  }
  selectElem.addEventListener("change", (e) => {
    let index = e.target.value;
    makePageForEpisodes([allEpisodes[index]]);

  });
  homeBtn.addEventListener("click", function () {
    // showImageAndSummaryPage(summary);
    // makePageForShow(info);
    // selectEpisode(allEpisodes)
    selectElem.innerHTML = "";
    episodeFrames.innerHTML = "";
    showSearch(allShows);
  });
  
}

// selectElem.addEventListener("mouseover", (e) => {
//   document.location.reload(true);
// });
    




window.onload = setup;



// function fetchAllEpisodes(showId){
//   fetch("https://api.tvmaze.com/show/" +showId + "/episodes")
//     .then(function (response) {
//     return response.json();
//    })
//    .then(function(data){
//      console.log(data.episode);
//      allEpisodes = episodesData;
//      filterEpisodes = episodesData.length
//    });

//    function fetchAllShows(){
//      allShows = getAllShows();
//      selectElem(allShows);

  //  }


//   .then((episodesData)=>{
//     allEpisodes = episodesData;
//     filterEpisodes = episodesData.length


//   })
// }

// fetch(" https://www.tvmaze.com/api#show-episode-list")
//   .then(function (response) {
//     return response.json();

//   })
//     .then(function (data) {
//       console.log(data);
//     })
//     .catch(function (error) {
//       console.log(error);

  // }

    