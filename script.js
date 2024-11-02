const apiKey = "c44eef74-d670-411e-8c7d-86da5f2373d0";
const matchesListElement = document.getElementById("match-list");

async function getMatchData() {
    try {
        const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`);
        const data = await response.json();

        if (data.status !== "success") {
            matchesListElement.innerHTML = "<li>Error loading matches. Please try again later.</li>";
            return;
        }

        const matchesList = data.data;
        if (!matchesList || matchesList.length === 0) {
            matchesListElement.innerHTML = "<li>No matches available at the moment.</li>";
            return;
        }

        const relevantMatches = matchesList
            .filter(match => match.series_id === "403410bb-b597-4da4-9fb4-fdab6b473813")
            .map(match => `<li>${match.name} - ${match.status}</li>`)
            .join('');

        matchesListElement.innerHTML = relevantMatches;

    } catch (error) {
        console.error("Error fetching match data:", error);
        matchesListElement.innerHTML = "<li>Error loading matches. Please try again later.</li>";
    }
}

// Initial call to fetch match data
getMatchData();
