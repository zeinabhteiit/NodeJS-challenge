
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
  text= text.trim();   // remove  spaces and line breaks from beg and end
  if (text === 'quit' || text ==='exit') {
    quit(); // if user types quit , call the quit fun
  }
  else if(text.startsWith ('hello') ) { // if inpt strts with hello,call hello fun
    hello(text);
  }
  else if (text === 'help'){ // if inpt is help..
    help();
  } 
  else if (text ==="list") {
    list();
  }
  else if (text.startsWith ('add') ) {
  add(text); // call fun if inpt starts wth add
  }
  else if (text.startsWith ('remove') ) {
  remove(text);
  }
  else if (text.startsWith ('edit') ) {
  edit(text);
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
  const parts = text.trim().split(" "); // stores words frm users inpt as an array
  const name = parts.slice(1).join(" "); //takes evrthg expt 1 word
  if (name){ // if name provided aftr hello, greet usr with their name
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
  process.exit(); // exit app
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
      2. hello <name> - prints "hello <name> !"
      3. quit or exit - exits the application
      4. help - displays this help message
      5. list - lists all tasks
      6. add <task> - adds a new task to the list
      7. remove - removes the last task in the list
      8. remove <task number> - removes the task at the given position
      
  `);
  }

let tasks = []; //initialize empty array to store tasks\\

function list(){
  if (tasks.length === 0){ //if ther r no tasks
    console.log('no tasks to display');
  } else { 
    console.log('task list:');
    tasks.forEach((task, index ) => {  // prnting each task with its index
    console.log (`${index}. ${task} `); // prnts task with its nb
    });
  }
}


function add(text){
  const parts = text.trim().split(' '); // split input text
  const task = parts.slice(1).join(' '); //takes evrythng after the (add x)
  if (task){ 
     tasks.push(task); // adds task to the list
     console.log(`task added: ${task} `); // prnts msg confrmng task was aded
  } else { //no task dscrption is provided
     console.log('error');
  }
}



function remove(text) {
    const parts = text.trim().split(' '); // Split input into parts
    const index = parseInt(parts[1]) - 1; // Convert to 0-based index
  
    if (isNaN(index)) {   // If no valid index  provided, remove the last task
       if (tasks.length > 0) {
          console.log(`Removed task: ${tasks.pop() } ` );
       } else {
        console.log('Error: No tasks to remove.');
       }
    } else if (index >= 0 && index < tasks.length) {  // If the index is valid, remove the task at that index
      console.log(`Removed task: ${tasks.splice(index, 1)} `);
    } else {
      console.log(`Error: Task number ${index + 1} does not exist.`);
    }
  }


function edit(text){
    const parts = text.trim().split(' '); // Split input into parts
    const index = parts[1]; 
    const newTask = parts.slice(2).join(' '); 
  
    if (!index) {
      console.log('Error: No task number or new text provided.');
    } else if (!newTask && tasks.length > 0) {  // If only new text is provided, update the last task
      tasks[tasks.length - 1] = index; // Update the last task to the new text
      console.log(`Last task edited to: ${index} `);
    } else {
      const taskIndex = parseInt(index) - 1; // Convert to 0-based index
      if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < tasks.length) {
        tasks[taskIndex] = newTask; // Update the task at the specified index
        console.log(` Task ${index} edited to: ${newTask} `);
      } else {
        console.log(`Error: Task number ${index} does not exist. `);
      }
    }
  }


// The following line starts the application
startApp("zeinab hoteit")


