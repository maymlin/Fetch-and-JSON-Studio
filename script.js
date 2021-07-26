// TODO: add code here
window.addEventListener("load", function() {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json")
    .then(function(response) {
        response.json()
        .then(function(jsonString) {
            // console.log(jsonString);

            let astronauntInfo = "";
            for (let i = 0; i < jsonString.length; i++) {
                astronauntInfo += addHTML(jsonString[i]);
            }

            document.getElementById("container").innerHTML = astronauntInfo;
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
                    <li>Active: ${data.active}</li>
                    <li>Skills: ${data.skills}</li>
                </ul>
            </div>
            <img class="avatar" src="${data.picture}">
        </div>
    `;
    return htmlWraper;
}