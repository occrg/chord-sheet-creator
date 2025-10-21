# Playlists Analyser
## Description
A tool that assists in the creation of chord simple and compact chord sheets.

## Current functionality
You can enter the title, artists, key, bpm, time signature and lyrics of a song and have them outputted into the console log as HTML ina  neat format so chords can be added separately.

## Future functionality
1. Add chords directly in the tool.
1. Include button helpers for symbols and potentially common notation (flat, sharp).
1. Allow PDF download of finished chord sheet (and HTML download).
1. Ability to cope with more than one page.
1. Allow export and import of data so user can pick up where they left off.
1. Handles all screen sizes.
1. Host this online.

## Pre-requisites
None.

## Instructions
1. Run Vue project.
1. Type in the title of the song and paste in the lyrics.
1. Optionally, type in the artist, key, bpm, time signature of the song.
1. Go to the console log and copy the HTML.
1. Paste the HTML into a file ending in `Chord Sheet.html` so it's ignored by git and place the file in the `chord_sheet` directory.
1. Add the chords to the HTML.
1. Open the HTML file in a browser and save it as a PDF.

## To Do
This is a list of things to do for the project, not including implementing the "future functionality" above.
1. Ensure consistent code formatting (including indentation, order of setup/lang).
1. Clean up file structure.
1. Move URLs linked in application to be environment variables.
1. Automatically detect lines in lyric submissions which are names of a segment or are chord lines.
1. Denote which fields are required.
1. Simplify code so similar logic isn't repeated in different places.
1. Potentially: Create an input component that does validation, automatically shows errors and puts required *.
1. Potentially: Use the Composition API over the Options API for Pinia.
1. Ensure long lines work well.