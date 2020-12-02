# Notes

## A Flexible Demo

Notes is a demo app designed to serve as an example of the use of React, Redux, NextJS and other technologies in the context of a typical note/memo app.

## Technologies

React was chosen because it is highly suited for apps designed for a single page (or only a few pages).

NextJS was used to allow for server-side rendering (SSR) and intuitive page-based routing.

For data persistence, this demo currently uses the browser's own Web Storage API to save notes in the few MB of data the browser allows each domain to store on the user's own hard drive. For the purposes of a demo, this has the simple advantage of allowing a user to try out the app without having to sign in, though still persisting any data they enter even after the page is closed.

However, the app is intended to be modular, with
alternative backends planned for implementation in
the near future. These will allow for examples of
persistence in e.g. MongoDB, Google Firestore/Firebase, and GraphQL/Apollo.

## Features

In addition to adding, editing and removing notes, this app allows them to be filtered by text and sorted by name and creation date.

The preferences pages allows configuring the default sort, as well as whether the sort and filter settings should be saved.

The notes have been created so that the note body can include Markdown formatting. To see how this works, try copying some of the examples from this [Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) into one of your notes.

## Use

A live version of this note app can be found at TEMPURL
