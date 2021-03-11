//You can edit ALL of the code here
let allEpisodes;
let inputElem;
let selectElem;
allEpisodes = getAllEpisodes();
let allShow;
// let showId;
// let allShow = getAllShows();
let homeBtn = document.getElementById("home");
let frames = document.getElementById("frames")


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
//  makePageForShow(Show);
//   console.log(allShow);

  // makePageForEpisodes(allEpisodes);
  inputElem = document.getElementById("input");
  inputElem.addEventListener("input", filterEpisodes);
  selectElem = document.getElementById("select-episodes");
  homeBtn.addEventListener("click", function () {
    // selectElem.disabled = false;
    selectElem.innerHTML = "";
    inputElem.value = "";
    frames.innerHTML = "";
    allShow.forEach((show)=>{
      makePageForShow(show);
    })
    
    
    });

//   fetch(`https://api.tvmaze.com/shows/${allShow[0].id}/episodes`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       filterEpisodes(data);
//       // makePageForEpisodes(data);
//       // addOneEpisode(data);
//       selectEpisode(data);
//     })
//     .catch(function (error) {
//       console.log(error)
//     });
}

  function makePageForShow(show) {

    let showInfoDiv = document.createElement("div");
    showInfoDiv.className = "showInfoDiv";
    let showTitle = document.createElement("h3");
    showTitle.id = show.id;
    showTitle.className = "showTitle";
    showTitle.innerHTML = show.name;
    showInfoDiv.appendChild(showTitle);
    if (show.image) {
      let showImg = document.createElement("img")
      showImg.src = show.image.medium
      showInfoDiv.appendChild(showImg);
    } else { console.log(show.name) };
    show.summary = show.summary.replace("</p>", " ");
    show.summary = show.summary.replace("<p>", " ");
    show.summary = show.summary.replace("</b>", " ");
    show.summary = show.summary.replace("<b>", " ");
    let showSummary = document.createElement("span");
    let showSummaryDiv = document.createElement("div");
    showSummary.className = "showSummary";
    showSummary.innerText = show.summary;
    showSummaryDiv.appendChild(showSummary);
    showInfoDiv.appendChild(showSummaryDiv);
    let divInfo = document.createElement("div");


// show information
    let showRating = document.createElement("span");
    showRating.innerHTML = `Rating:${show.rating.average}`;
    divInfo.appendChild(showRating);
    let showGenres = document.createElement("span");
    showGenres.innerHTML = `Genres:${show.genres}`;
    divInfo.appendChild(showGenres);
    let showStatus = document.createElement("span");
    showStatus.innerHTML = `Status:${show.status}`;
    divInfo.appendChild(showStatus);
    let showRuntime = document.createElement("span");
    showRuntime.innerHTML = `Runtime:${show.runtime}`;
    divInfo.appendChild(showRuntime);
    frames.appendChild(showInfoDiv);
    showSummaryDiv.appendChild(divInfo);
    divInfo.id = "divInfo";
    
   }
  
     

 
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
    // frames.innerHTML = "";


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
  // const rootElem = document.getElementById("root");
  // rootElem.innerHTML = "";
  frames.innerHTML = "";
  episodeList.forEach(function (episode) {
    addOneEpisode(episode);
  });
}

function addOneEpisode(episode) {
  let divElem = document.createElement("div");
  let h2El = document.createElement("h2");
  let imgElem = document.createElement("img");
  let parElem = document.createElement("p");
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
  document.getElementById("frames").appendChild(divElem);
  divElem.appendChild(h2El);
  divElem.appendChild(imgElem);
  divElem.appendChild(parElem);
}


function selectEpisode(allEpisodes) {
 let showOption = document.createElement("option");
  showOption.value = 0;
  showOption.text = "Episodes";
  selectElem.appendChild(showOption);
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
  
}

// selectElem.addEventListener("mouseover", (e) => {
//   document.location.reload(true);
// });
    
window.onload = setup;




    