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
        <p id="song-details"></p>
    </div>
</body>
`

function insertSongDetails(chordSheetHTML) {
    chordSheetHTML.querySelector("#song-title").innerHTML = document.getElementById("song-title-input").value;
    chordSheetHTML.querySelector("#song-artist").innerHTML = document.getElementById("song-artist-input").value;

    songDetailsInnerHTML = "";
    if (document.getElementById("song-key-input").value) {
        songDetailsInnerHTML += `Key: ${document.getElementById("song-key-input").value}`;
    }
    if (document.getElementById("song-bpm-input").value) {
        if (songDetailsInnerHTML != "") songDetailsInnerHTML += "; ";
        songDetailsInnerHTML += `Tempo: ${document.getElementById("song-bpm-input").value}bpm`;
    }
    if (document.getElementById("song-time-signature-input").value) {
        if (songDetailsInnerHTML != "") songDetailsInnerHTML += "; ";
        songDetailsInnerHTML += `Time: ${document.getElementById("song-time-signature-input").value}`;
    }
    if (songDetailsInnerHTML == "") {
        chordSheetHTML.querySelector("#song-details").remove()
    } else {
        chordSheetHTML.querySelector("#song-details").innerHTML = songDetailsInnerHTML
    }

    return chordSheetHTML;
}

async function createChordSheet() {
    const parser = new DOMParser();
    chordSheetHTML = parser.parseFromString(CHORD_SHEET_TEMPLATE_HTML, "text/html");
    chordSheetHTML = insertSongDetails(chordSheetHTML);
    console.log(chordSheetHTML)
}

