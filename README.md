# Playlists Analyser
## Description
A tool that assists in the creation of chord simple and compact chord sheets.

## Current functionality
You can enter the lyrics and chords of a song to generate a chord sheet as a HTML file which can be printed.

## Non-functional notes
* Screen sizes from 320px to 1728px supported.

## Future functionality
1. Include button helpers for symbols and potentially common notation (flat, sharp).
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
1. Add the song's chords.
1. Click to download the HTML file.
1. Open the HTML file in a browser and save it as a PDF.

## To Do
This is a list of things to do for the project, not including implementing the "future functionality" above.
1. Fix typescript error with input fields.
1. Add helper text into all accordion steps and ensure the padding is consistent and in its most maintainable form above and below accordion content.
1. Ensure step 3 works with small screen sizes.
1. Ensure capitalisation is consistent in all field labels. See "Time signature" compared to "Chord Line".
1. Add special formatting for chord lines including right margin for all chords and reduced letter spacing for chord symbols.
1. Show thrown errors to end users.
1. Use term "section" everywhere instead of "segment".
1. Ensure HTML elements are identifiable from dev tools. Can use dynamic IDs to make dynamically generated elements unique.
1. Reduce padding on elements with borders so total size of elements are expected.
1. Add a warning when prefilling chord sheet if this will overwrite any existing data.
1. Ensure consistent code formatting (including indentation, order of setup/lang).
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