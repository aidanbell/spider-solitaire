# SPIDER SOLITAIRE

## About
I'm going to put an 'About' section here.


## ToDo:

### Columns
- Expand handleClick to add .active class to the selected card
- Add exception for accidentally clicking the wrapper
- ReTool the faceup/facedown functions to be universal, not tied to deal
- Write function to automatically turn the last card in the column face up
- Figure out updating columns after every turn
- Figure out moving the cards
- Try HTML5 Drag and drop OR select card => select destination
- Write function to see if cards are allowed to be placed
- Write function to select stack when clicking on middle card
- Create win logic
-

### Deck
- Display staggered piles indicating the amount of deals left
- Add event listener to deck
- Write dealOne function to add one card to each column
  - (which would use isLastInCol checker to turn face-up; DRY code)
  - also removes one pile from display
- sounds when dealing maybe?

### Footer
- First of all, ADD a footer
- Have buttons for
  - 'New Game'
  - 'Hint'(maybe?)
  - 'Settings' (for more suits)

### Intro Screen
- Have transparent div that shows instructions
- Asks for number of suits
- Maybe select card background since I have red and blue 
