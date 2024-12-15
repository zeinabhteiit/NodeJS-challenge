
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to zeinab's application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  console.log('received input : ', text);
  text= text.trim();   // remove  spaces and line breaks
  if (text === 'quit' || text ==='exit') {
    quit();
  }
  else if(text.startsWith ('hello') ) {
    hello(text);
  }
  else if (text === 'help'){
    help();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  const parts = text.trim().split(" ");
   const name = parts.slice(1).join(" ");
  if (name){
    console.log(`hello ${name}!`);
  } else {
      console.log('hello!');
    }
  }


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!');
  process.exit();
}

 /*
 *lists all available commands for the user.
 *this func prints a list of the commands and their descriptions.
 *
 * @returns {void}
 */
function help(){
  console.log('available command: 1. hello-prints hello  2.hello <name> - prints "hello <namme> !" 3. quit or exit - exits the application  4. help-displays this help message ');
  }

// The following line starts the application
startApp("zeinab hoteit")


