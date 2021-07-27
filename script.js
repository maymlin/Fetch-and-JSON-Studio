// TODO: add code here
window.addEventListener("load", function() {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json")
    .then(function(response) {
        response.json()
        .then(function(jsonString) {
            // console.log(jsonString);
            let contentSpace = document.getElementById("container");
            // 26.6.3 Bonus Missions #1 and 2
            let hoursArray = [];
            jsonString.forEach(function(astronaut) {
                hoursArray.push(astronaut.hoursInSpace);
            });

            hoursArray = mergeSort(hoursArray);

            let astronautInfo = "";
            for (let i = hoursArray.length - 1; i >= 0; --i) {
                for (const astronaut of jsonString) {
                    if (astronaut.hoursInSpace === hoursArray[i]) {
                        astronautInfo += addHTML(astronaut);
                    }
                }
            }
              
            
            // 26.6.2 Requirements
            /*
            let astronautInfo = "";
            for (let i = 0; i < jsonString.length; i++) {
                astronautInfo += addHTML(jsonString[i]);
            }
            */

            // 26.6.3 Bonus Missions #3
            let newElement = document.createElement("h2");
            newElement.innerHTML = `Astronaunt count: ${jsonString.length}`;
            document.querySelector("body").insertBefore(newElement, contentSpace);

            contentSpace.innerHTML = astronautInfo;
        });
    });
});

function addHTML(data) {
    let htmlWraper = `
        <div class="astronaut">
            <div class="bio">
                <h3>${data.firstName} ${data.lastName}</h3>
                <ul>
                    <li>Hours in space: ${data.hoursInSpace}</li>
                    <li style="${data.active ? "color: green;" : ""}">Active: ${data.active}</li>
                    <li>Skills: ${data.skills.join(", ")}</li>
                </ul>
            </div>
            <img class="avatar" src="${data.picture}">
        </div>
    `;
    return htmlWraper;
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);

    left = mergeSort(left);
    right = mergeSort(right);

    return merge(left, right);
}

function merge(arr1, arr2) {
    let sortedArr = [];

    while (arr1.length > 0 && arr2.length > 0) {
        if (arr1[0] > arr2[0]) {
            sortedArr.push(arr2.shift());
        } else {
            sortedArr.push(arr1.shift());
        }
    }

    while (arr1.length > 0) {
        sortedArr.push(arr1.shift());
    }

    while (arr2.length > 0) {
        sortedArr.push(arr2.shift());
    }

    return sortedArr;
}