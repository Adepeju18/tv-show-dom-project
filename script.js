//You can edit ALL of the code here
let allEpisodes;
let inputElem;
let selectElem;
allEpisodes = getAllEpisodes();

function setup() {
  // allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  inputElem = document.getElementById("input");
  inputElem.addEventListener("input", filterEpisodes)
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


  function addOneEpisode(episode) {
    let divElem = document.createElement("div");
    let h2El = document.createElement("h2");
    let imgElem = document.createElement("img");
    let parElem = document.createElement("p");
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


  selectElem = document.getElementById("select-episodes");
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
  
    selectElem.addEventListener("mouseover",(e)=>{
      document.location.reload(true);
    });
  

}

window.onload = setup;
