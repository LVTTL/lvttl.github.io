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
        repos.forEach (repo => {
            getReadme(repo);
        })
    });
}

function getReadme(repo) {
    fetch("https://api.github.com/repos/lvttl/"+repo.name+"/contents/README.md").then(response => {
        return response.json()
    }).then(result => console.log(window.atob(result.content)));
}

// get README.md



window.addEventListener("load", evt => {
    getRepos();
});