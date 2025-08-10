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
        <div id="chord-section"></div>
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

function getHTMLForSongSegment(songSegment, ind) {
    let segmentDiv = document.createElement("div");
    segmentDiv.classList.add("segment");

    let segmentTitle = document.createElement("p");
    segmentTitle.classList.add("segment-title");
    segmentTitle.innerHTML = `Segment ${ind}`;

    let segmentContents = document.createElement("div");
    segmentContents.classList.add("segment-contents");

    let segmentLyricLines = songSegment.split("\n");

    segmentLyricLines.forEach(function (segmentLyricLine, ind) {
        let segmentLyricLineHTML = document.createElement("p");
        segmentLyricLineHTML.classList.add("lyric-line");
        segmentLyricLineHTML.innerHTML = segmentLyricLine;
        segmentContents.appendChild(segmentLyricLineHTML);
    });

    segmentDiv.appendChild(segmentTitle);
    segmentDiv.appendChild(segmentContents);

    return segmentDiv;
}

function insertSongSegments(chordSheetHTML) {
    songLyrics = document.getElementById("song-lyrics-input").value;
    let songSegments = songLyrics.split("\n\n");

    songSegments.forEach(function (songSegment, ind) {
        let songSegmentHTML = getHTMLForSongSegment(songSegment, ind);
        chordSheetHTML.querySelector("#chord-section").appendChild(songSegmentHTML);
    });

    return chordSheetHTML;
}

function createChordSheet() {
    const parser = new DOMParser();
    chordSheetHTML = parser.parseFromString(CHORD_SHEET_TEMPLATE_HTML, "text/html");
    chordSheetHTML = insertSongDetails(chordSheetHTML);
    chordSheetHTML = insertSongSegments(chordSheetHTML);
    console.log(chordSheetHTML)
}

