document.addEventListener("DOMContentLoaded", () => {
    // 🪲 Bug: Incorrect ID used for attaching the event listener
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // 🪲 Bug: Incorrect element ID
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async']);
        // 🪲 Bug: What's mssing from JS concepts?
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // 🪲 Bug: Incorrect function call
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // 🪲 Bug: Asynchronous function ?
    document.getElementById("solveRoom3").addEventListener("click", () => {
        // fetches this file from the server that has the directions
        fetch('directions.json') 
            // converts this file into an object javascript can use
            .then(response => response.json())
            // Take the directions we got, and give them to the navigateLabyrinth function to process
            .then(directions => {
                navigateLabyrinth(directions)
            // When navigateLabyrinth function is done, take its message and put it inside the room3Result element on the webpage
                    .then(message => {
                        // 🪲 Bug: Incorrect method
                        document.getElementById("room3Result").innerHTML = message;
                    });
            });
    });
});

function findMostRecentBook(books) {
    // 🪲 Bug: Logic error
    // uses reduce to find the most recent book by comparing the dates of two books and if the current books
    // date is is newer then this book is chosen otherwise choose the next newer book in the list 
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

// this function finds commonalities between the two set by comparing them with eachother and return a new set
// named intersection with all the things they have in common
function findIntersection(setA, setB) {
    // 🪲 Bug: Incorrect logic
    const intersection = new Set([...setA,...setB].filter(concept =>  setB.has(concept))); 
    return intersection;
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        // 🪲 Bug: No delay
       await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

