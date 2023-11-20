# Blackjack

## Project setup

This project consists of 2 parts - frontend application and backend server

To launch them follow instructions in each of the folders.

## Description

- The game UI is minimalistic, it shows dealers hand (at the top), actions bar (in the middle) and a players hand (at the bottom).


- When the page is loaded, backend generates a new "game table" for a frontend to use. This way, if you open multiple tabs, you should have different games going on.
> Note: This table setup is very basic. There where some simplifications made:
> 1. When random ID is created, it doesn't check if that exact id exists. ID generation is an area for improvement. (Reason: I wanted to have short, simple and presentable game table ID)
> 2. On a frontend, there is no way to "join" someone else's table or to "close" the game table. As this is a small demo, this was not implemented, but backend game manager has functions to delete or retrieve a game by a given ID.

- Game consists of multiple states, which are shown in the actions bar.
In each of these states, there are different actions that player can do, for example in "The Play", player may choose to "Hit" or "Stand".
Change of game state is done automatically, when the corresponding action is executed.

- Besides points, hand has a name. For example, your ace and 6 are "Soft 17", which means it can be 17 or 7, whichever you prefer.
