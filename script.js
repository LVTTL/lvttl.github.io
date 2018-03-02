//@ts-check

function getRepos() {
    let repos;
    //console.log("fetching repos");
    
    fetch("https://api.github.com/users/lvttl/repos").then(response => {
        return response.json()
    }).then(result => {
        repos = result;
        //console.log(result);
        let container = document.getElementById("content");
        repos.forEach(repo => {
            let child = document.createElement("div");
            child.className = "small-item";
            // child.innerText = repo.name;
            let title = document.createElement("h4");
            title.innerText = repo.name;
            child.appendChild(title);
            getReadme(repo, child); 
            container.appendChild(child);
        });
    });
}

function getReadme(repo, node) {
    fetch("https://api.github.com/repos/lvttl/"+repo.name+"/contents/README.md").then(response => {
        return response.json()
    }).then(result => {
        let markdown = window.atob(result.content);
        let lines = markdown.split('\n');
        lines = lines.filter((val, i) => i > 0);
        let lastRelevantLineNum = lines.findIndex((line, i) => line.charAt(0) == '#');
        if (lastRelevantLineNum < 0) {
            lastRelevantLineNum = lines.length;
        }
        //console.log(lastRelevantLineNum);
        lines = lines.filter((line, i) => i < lastRelevantLineNum - 1);
        //console.log(lines);
        let description = lines.reduce((prev, cur, i, array) => prev + '\n' + cur);
        //console.log(description);
        let descNode = document.createElement("p");
        descNode.innerText = description;
        node.appendChild(descNode);
    });
}

window.addEventListener("load", evt => {
    getRepos();
});