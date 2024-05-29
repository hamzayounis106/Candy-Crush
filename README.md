**Candy Crush Clone**

This is a simple clone of the popular game Candy Crush built using React. In this game, players can swap adjacent candies to form rows or columns of three or more candies of the same color, causing them to disappear and new candies to fall into place. Players earn points for each match they make, and the goal is to achieve the highest score possible by making matches strategically.

### How to Play

1. **Starting the Game:**
   - Upon loading the game, a grid of candies is displayed.
   - Players can see their current score at the top of the screen.

2. **Making Moves:**
   - To make a move, players can drag a candy and swap it with an adjacent candy.
   - Swapping candies will only be allowed if it results in a valid move (i.e., it creates a row or column of three or more candies of the same color).

3. **Matching Candies:**
   - When three or more candies of the same color align in a row or column, they will disappear from the grid.
   - New candies will fall into place from above to fill the empty spots created by the disappearing candies.

4. **Scoring:**
   - Players earn points each time they make a match.
   - The score is displayed at the top of the screen.
   - Matching more candies at once or creating special combinations may result in higher scores.

5. **Game Over:**
   - The game continues until there are no more valid moves left.
   - Players can reset the game board at any time to start a new game.

### Project Setup

1. **Installation:**
   - Clone the repository to your local machine.
   - Navigate to the project directory.
   - Run `npm install` to install the required dependencies.

2. **Running the Game:**
   - After installing dependencies, run `npm start` to start the development server.
   - Open your web browser and navigate to `http://localhost:3000` to play the game.

3. **Game Controls:**
   - Use the mouse to drag and drop candies to swap them.
   - Click the "Reset Board" button to start a new game.

4. **Customization:**
   - You can customize the game by modifying the `candies` array in the `App.js` file to change the types of candies available.
   - Additionally, you can modify the game's appearance and behavior by adjusting the CSS styles and JavaScript code.

5. **Enjoy Playing!**
   - Have fun playing Candy Crush Clone and aim for the highest score possible!