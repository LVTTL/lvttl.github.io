//@ts-check

function getRepos() {
    let repos;
    console.log("fetching repos");
    
    fetch("https://api.github.com/users/lvttl/repos").then(response => {
        return response.json()
    }).then(result => {
        repos = result;
        console.log(result);
        let container = document.getElementById("content");
        repos.forEach(repo => {
            let child = document.createElement("div");
            child.className = "small-item";
            // child.innerText = repo.name;
            let title = document.createElement("h4");
            title.innerText = repo.name;
            child.appendChild(title);
            container.appendChild(child);
        });
    });
}


window.addEventListener("load", evt => {
    getRepos();
});