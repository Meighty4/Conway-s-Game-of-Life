# **Conway's Game of Life**

## Brief Introduction

Conway's Game of Life is a cellular automaton, which consists of a regular grid of cells, each in one of a finite number of states, such as on and off.   

***The states of these cells are governed by 4 simple rules:***

**1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.  
2. Any live cell with two or three live neighbours lives on to the next generation.  
3. Any live cell with more than three live neighbours dies, as if by overpopulation.  
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.**

Although easy at first glance, this simulation can produce many astounding, but equally useful patterns, and as such has been the object of study of a long-lasting community spanning from the 70s till today.  
In that time people have documented many behaviours and even managed to use them to model real algorithms--all from one fixed starter state.

## What is this project

This project is a limited version of the Game of Life. It only has a 30×30 non-wrapping grid that can only be initialised with manual input. The only way to reset the grid is to refresh the website.

## How to use it

1. Load the website
2. Select the cells you wish to activate
3. Press play
4. The simulation will go on until you exit, reload, or press the pause button
5. Upon pressing the pause button you will be able to select new cells and deselect active cells
