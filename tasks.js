
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
  else if (text ==="list") {
    list();
  }
  else if (text.startsWith ('add') ) {
  add(text); // call fun if input starts with add
  }
  else if (text.startsWith ('remove') ) {
  remove(text);
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
  console.log(`available command:
      1. hello - prints hello  
      2. hello <name> - prints "hello <namme> !"
      3. quit or exit - exits the application
      4. help - displays this help message
      5. list - lists all tasks
      6. add <task> - adds a new task to the list
      7. remove - removes the last task in the list
      8. remove <task number> - removes the task at the given position
  `);
  }

let tasks = []; //initialize some tasks

function list(){
  if (tasks.length === 0){
    console.log('no tasks to display');
  } else {
    console.log('task list:');
    tasks.forEach((task, index ) => {
    console.log (`${index}. ${task} `);
    });
  }
}


function add(text){
  const parts = text.trim().split(' '); // split input text
  const task = parts.slice(1).join(' '); //takes evrythng after the (add x)
  if (task){
     tasks.push(task); // add task to the list
     console.log(`task added: ${task} `);
  } else {
     console.log('error');
  }
}


function remove(text){
  const parts = text.trim().split(' '); // split the input
  const index = parts[1];
  if(tasks.length === 0) {
    console.log('error'); // if is 0 error no task to remove
  } else if  (!index){   // if rmv cmd has no additionl arg remove the last task
    console.log(`removed task: ${tasks.pop() } `);
  }else if ( index > 0 && index <= tasks.length ) {  
    console.log(`removed task: ${task.splice(index -1, 1) } `);
  } else{
    console.log(`error`);
  }
  }  
 

// The following line starts the application
startApp("zeinab hoteit")


