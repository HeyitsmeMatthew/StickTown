// Create the PixiJS application
const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x87ceeb, // sky blue
});
document.body.appendChild(app.view);

// Load assets
PIXI.Assets.load('player.png').then(() => {
    const player = PIXI.Sprite.from('player.png');
    player.anchor.set(0.5);
    player.x = app.screen.width / 2;
    player.y = app.screen.height / 2;
    app.stage.addChild(player);

    // Keyboard movement
    const keys = {};
    window.addEventListener("keydown", (e) => keys[e.key] = true);
    window.addEventListener("keyup", (e) => keys[e.key] = false);

    app.ticker.add(() => {
        if (keys['ArrowUp']) player.y -= 2;
        if (keys['ArrowDown']) player.y += 2;
        if (keys['ArrowLeft']) player.x -= 2;
        if (keys['ArrowRight']) player.x += 2;
    });
});
// Create the box
const textBox = new PIXI.Graphics();
textBox.beginFill(0x000000, 0.7);
textBox.drawRoundedRect(50, 400, 700, 120, 16);
textBox.endFill();
textBox.visible = false; // hidden by default
app.stage.addChild(textBox);

// Create the text
const dialogueText = new PIXI.Text('', {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0xFFFFFF,
  wordWrap: true,
  wordWrapWidth: 680,
});
dialogueText.x = 70;
dialogueText.y = 420;
dialogueText.visible = false;
app.stage.addChild(dialogueText);

// Sample dialogue
const dialogueLines = [
  "Hey there, welcome to Sticktown!",
  "You can earn coins just by chatting!",
  "Decorate your house, meet friends, and stick around!"
];

let currentLine = 0;
let currentChar = 0;
let isTyping = false;

// Function to show the textbox
function showTextBox(lineIndex) {
  textBox.visible = true;
  dialogueText.visible = true;
  dialogueText.text = '';
  currentLine = lineIndex;
  currentChar = 0;
  isTyping = true;
}

// Typewriter effect
app.ticker.add(() => {
  if (isTyping) {
    const fullText = dialogueLines[currentLine];
    if (currentChar < fullText.length) {
      dialogueText.text += fullText[currentChar];
      currentChar++;
    } else {
      isTyping = false;
    }
  }
});

// Advance on click
app.view.addEventListener('click', () => {
  if (!isTyping) {
    currentLine++;
    if (currentLine < dialogueLines.length) {
      showTextBox(currentLine);
    } else {
      textBox.visible = false;
      dialogueText.visible = false;
    }
  }
});

// Start the first line
showTextBox(0);
