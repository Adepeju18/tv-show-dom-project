//You can edit ALL of the code here
let allEpisodes;
let inputElem;
let selectElem;
allEpisodes = getAllEpisodes();
 let allShow;
// let allShow = getAllShows();


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
  selectEpisode(allEpisodes);

  // makePageForEpisodes(allEpisodes);
  inputElem = document.getElementById("input");
  inputElem.addEventListener("input", filterEpisodes)



fetch(`https://api.tvmaze.com/shows/${allShow[0].id}/episodes`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    filterEpisodes(data);
    makePageForEpisodes(data);
    addOneEpisode(data);
     selectEpisode(data);
  })
  .catch(function (error) {
    console.log(error)
  });

 }
function populateShowSelect(){
  const selectShow = document.getElementById("select-show");
  allShow.forEach((show) => {
    let option = document.createElement("option");
    option.innerText = show.name;
    option.value = show.id
    selectShow.appendChild(option);
  });
  selectShow.addEventListener("change", (e) => {
    let showId = e.target.value;
    console.log(showId);
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then(function (response) {
        return response.json();
      })
      .then(function(data){
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
    parElem.innerHTML = `${episode.summary}`;
    divElem.classList = "summaryContainer";
    document.getElementById("root").appendChild(divElem);
    divElem.appendChild(h2El);
    divElem.appendChild(imgElem);
    divElem.appendChild(parElem);
  }



function selectEpisode(allEpisodes){
  selectElem = document.getElementById("select-episodes");
  selectElem.innerHTML = "";
  for (let i = 0; i < allEpisodes.length; i++) {
    let showOption = document.createElement("option");
    showOption.value = i;
    showOption.innerHTML = `S${String(allEpisodes[i].season).padStart(2, "0")}  
    E${String(allEpisodes[i].number).padStart(2, "0")} -${allEpisodes[i].name}`;
    selectElem.appendChild(showOption);
  }
  selectElem.addEventListener("change", (e) => {
    let index = e.target.value;
     makePageForEpisodes([allEpisodes[index]]);

  })
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

