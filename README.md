# Playlists Analyser
## Description
A tool that assists in the creation of chord simple and compact chord sheets.

## Current functionality
You can enter the title, artists, key, bpm, time signature and lyrics of a song and have them outputted as a HTML file so chords can be added separately.

## Non-functional notes
* Screen sizes from 320px to 1728px supported.

## Future functionality
1. Add chords directly in the tool.
1. Include button helpers for symbols and potentially common notation (flat, sharp).
1. Allow export and import of data so user can pick up where they left off.
1. Host this online.
1. Allow PDF download of finished chord sheet.
1. Ability to cope with more than one page.
1. About page explaining what the project is, why I did it and how.
1. Full AAA accessibility.

## Pre-requisites
None.

## Instructions
1. Run Vue project.
1. Type in the title of the song and paste in the lyrics.
1. Optionally, type in the artist, key, bpm, time signature of the song.
1. Click to download the HTML file.
1. Open the HTML in text editor and add the chords to the HTML.
1. Open the HTML file in a browser and save it as a PDF.

## To Do
This is a list of things to do for the project, not including implementing the "future functionality" above.
1. Ensure names of file downloads are based on the song details.
1. Refactor folder structure so Vue project isn't unnecessarily one folder down.
1. Fix issue with resubmitting lyrics resulting in adding lines rather than replacing.
1. Ensure consistent code formatting (including indentation, order of setup/lang).
1. Ensure HTML elements are identifiable from dev tools.
1. Ensure appropriate HTML elements are used everywhere.
1. Refactor convoluted way to call complete functions.
1. Move URLs linked in application to be environment variables.
1. Add animations for toggling of accorion (accordion open and chevron rotating).
1. Abstract styling of ChevronIcon so it can be used more flexibly later.
1. Automatically detect lines in lyric submissions which are names of a segment or are chord lines.
1. Denote which fields are required.
1. Potentially: Use the Composition API over the Options API for Pinia.
1. Potentially: Separate out accordion logic into own library. 
1. Ensure long lines work well.
1. Use consts wherever possible.