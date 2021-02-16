//You can edit ALL of the code here
let allEpisodes;
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  allEpisodes.forEach(function(show){
    let divElem = document.createElement("div");
    let h2El = document.createElement("h2");
    let imgElem = document.createElement("img");
    let parElem = document.createElement("p");
    let displayNum = document.getElementById("search-result");
    h2El.innerHTML = `${show.name}- S${String(show.season).padStart(2,"0")}
    E${String(show.number).padStart(2,"o")}`;
    imgElem.src = `${show.image.medium}`;
    parElem.innerHTML = `${show.summary}`;
    divElem.classList = "summaryContainer";
    document.getElementById("root").appendChild(divElem);
    divElem.appendChild(h2El);
    divElem.appendChild(imgElem);
    divElem.appendChild(parElem);
    // showItem(item);
  });

   let myItemList= document.getElementById("itemList");
  //  const searchFieldElem = document.getElementById("searchField");
  let inputElem = document.getElementById("input");
  inputElem.addEventListener("input",function(){
    // searchFieldElem.addEventListener("searchField",function(){
    allEpisodes.map(function(episodes){
     if(episodes.name.includes(inputElem.value)===true){
        console.log(episodes.name);
       let myItem = document.createElement("li");
       myItem.innerHTML = `${episodes.name}`;
        myItemList.appendChild(myItem);
      }
   })

 })
}
// function showItem(item){
//   const list = document.getElementById("itemList");
//   list.innerHTML = "";
//   item.forEach(item =>{
//     const elem = document.createElement("li");
//     elem.innerText = item;
//     list.appendChild(elem);
//   });
//   displayNum.innerText = `Displaying ${episodeList.length}/ ${allEpisodes.length}`;
//  }

 function makePageForEpisodes(episodeList) {
  // displayNum.innerText = `Displaying ${episodeList.length}/ ${allEpisodes.length}`;
   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episodes(s)}`;
//    console.log(episodeList);
  
 }

// let searchTimeoutToken = 0;

// window.onload =  () =>{
//   const searchFieldElem = document.getElementById("searchField").value;
//   searchFieldElem.onkeyup = (episodes)=>{

//     clearTimeout(searchTimeoutToken);
//     if(searchFieldElem.value.length === 0){
//       return;
//     }
//    searchTimeoutToken = setTimeout(()=>{
//       setup(searchFieldElem.value);
//     },300)
    
  // }
// }
 window.onload = setup;
