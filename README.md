# Playlists Analyser
## Description
A tool that assists in the creation of chord simple and compact chord sheets.

## Current functionality
You can enter the lyrics and chords of a song to generate a chord sheet as a HTML file which can be printed.

## Non-functional notes
* Screen sizes from 320px to 1728px supported.
* Currently only later versions of Google Chrome are supported as browsers.

## Future functionality
1. Include button helpers for symbols, potentially common notation (flat, sharp) and transposing chords.
1. Allow PDF download of finished chord sheet.
1. About page explaining what the project is, why I did it and how.
1. Full AAA accessibility.

## Pre-requisites
None.

## Instructions
1. Run the Vue project (see package.json for commands) or go to site where this project is hosted [online](https://chord-sheet-creator.netlify.app/).
1. Type in the title of the song and paste in the lyrics.
1. Optionally, type in the artist, key, bpm, time signature of the song.
1. Add the song's chords.
1. Click to download the HTML file.
1. Open the HTML file in a browser and save it as a PDF.

## To Do
This is a list of things to do for the project, not including implementing the "future functionality" above.
1. Fix typescript error with input fields.
1. Automatically detect lines in lyric submissions which are names of a segment or are chord lines. This should work well when copy and pasting from common chord sheet sites.
1. Write more detail on how prefill works for both data input and lyric/chord sheet copy and paste.
1. Recalculate chunk positioning when song details added too to avoid lyrics at end of sheet going missing in this case.
1. Add more cases for segment titles based on the content of the line e.g. "Chorus", "Verse 2".
1. Move HTML and PDF generation to the ChordSheetGenerator and clean up CSS.
1. Add a song details component so code isn't repeated in ChordSheetPreview and ChordSheetGenerator.
1. Add helper text into all accordion steps and ensure the padding is consistent and in its most maintainable form above and below accordion content.
1. Ensure capitalisation is consistent in all field labels. See "Time signature" compared to "Chord Line".
1. Add maximum number of lines/sections to prevent slowing down on too many.
1. When changing a line, update each page as you go to make the preview more reactive.
1. When changing a line, only update from the page that's being updated onwards to make the preview more reactive.
1. Validate inputs including JSON input to stop bad JSON breaking app.
1. Make app work on more browsers.
1. Refactor JSON output and input so repetition of interfaces isn't necessary.
1. Add special formatting for chord lines including right margin for all chords and reduced letter spacing for chord symbols.
1. Show thrown errors to end users.
1. Use term "section" everywhere instead of "segment".
1. Ensure HTML elements are identifiable from dev tools. Can use dynamic IDs to make dynamically generated elements unique.
1. Reduce padding on elements with borders so total size of elements are expected.
1. Add a warning when prefilling chord sheet if this will overwrite any existing data.
1. Ensure consistent code formatting (including indentation, order of setup/lang).
1. Test prefilling chord sheet with large amounts of data and consider adding limits and/or loading symbol.
1. Ensure appropriate HTML elements are used everywhere.
1. Refactor convoluted way to call complete functions.
1. Move URLs linked in application to be environment variables.
1. Add animations for toggling of accorion (accordion open and chevron rotating).
1. Abstract styling of ChevronIcon so it can be used more flexibly later.
1. Denote which fields are required.
1. Potentially: Use the Composition API over the Options API for Pinia.
1. Potentially: Separate out accordion logic into own library. 
1. Ensure long lines work well.
1. Fix errors to make sure they aren't accidentally separated out onto new lines.
1. Use consts wherever possible.