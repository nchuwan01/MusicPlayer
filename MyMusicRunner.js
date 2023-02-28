const { response } = require("express");

let selectArtistEle = document.getElementById("selectArtist");
let selectTrackEle = document.getElementById("selectMusic");
let playList = document.getElementById("playlistDiv");
let listOfImg =  ["m1.jpg","m2.jpg","m3.jpg","m4.webp","m5.webp","m6.jpg","m7.jpg","m8.webp","m9.jpg","m10.jpg"];



fetch('https://api.napster.com/v2.0/artists/top?apikey=MmZiY2YxMjYtMjZhNS00N2E1LTg4MmEtM2FjMjk4NGY2NDg2&limit=200')
            .then(r => {
                return r.json();
            })
            .then(data => {
                
                selectArtistEle.innerHTML = "";
                console.log("it's getting here!")
                console.log(data);
                Array.from(data.artists).forEach((a) => {
                    selectArtistEle.innerHTML += `<option value=${a.id} artistName = "${a.name}" >${a.name}</option>`;
                })
            })



//             fetch('https://example.com/profile/avatar', {
//   method: 'PUT',
//   body: formData
// })
//   .then((response) => response.json())
//   .then((result) => {
//     console.log('Success:', result);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


function ArtistChanged()
{
    fetch(`https://api.napster.com/v2.0/artists/${selectArtistEle.value}/tracks/top?apikey=MmZiY2YxMjYtMjZhNS00N2E1LTg4MmEtM2FjMjk4NGY2NDg2&limit=15`)
        .then(d =>{
            console.log(d)
            return d.json();
        }).then(info => {
            selectTrackEle.innerHTML = "";
           Array.from(info.tracks).forEach(track => {
               selectTrackEle.innerHTML += `<option value=${track.previewURL} trackName="${track.name}">${track.name} </option>`;
           })
    })
}

    document.getElementById("add").addEventListener("click", (event) => {
        name = document.getElementById("myName").value;
        if(!name)
        {
            name= "unnamed";
        }
        songInfo = selectTrackEle.options[selectTrackEle.selectedIndex].getAttribute("trackName")+"-"+selectArtistEle.options[selectArtistEle.selectedIndex].getAttribute('artistName');
        imgLocation = './images/'+listOfImg[Math.floor(Math.random() * 10)];
        //C:\Users\nchuwan01\my_project1Music\musicPlayer\images
        console.log(selectTrackEle.value)
        let storeDivs =`<div class="mainAlbumDiv">
            <div class="album" style="background-image: url(${imgLocation}); background-size: cover">
                <audio controls>
                    <source src=${selectTrackEle.value} type="audio/mpeg">
                </audio>
            </div>
            <p class="musicTitle" style="width: 100%"> <b>${songInfo}</b><br/> shared by ${name} </p>
        </div>`;
        playList.insertAdjacentHTML("afterbegin", storeDivs);


    
    })


