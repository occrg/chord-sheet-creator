const CHORD_SHEET_TEMPLATE_HTML = `
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="chord_sheet.css">
</head>
<body>
    <div class="page">
        <h1 id="song-title"></h1>
        <h2 id="song-artist"></h2>
    </div>
</body>
`

function insertSongDetails(chordSheetHTML) {
    chordSheetHTML.querySelector("#song-title").innerHTML = document.getElementById("song-title-input").value;
    chordSheetHTML.querySelector("#song-artist").innerHTML = document.getElementById("song-artist-input").value;
    return chordSheetHTML;
}

async function createChordSheet() {
    const parser = new DOMParser();
    chordSheetHTML = parser.parseFromString(CHORD_SHEET_TEMPLATE_HTML, "text/html");
    chordSheetHTML = insertSongDetails(chordSheetHTML);
    console.log(chordSheetHTML)
}

