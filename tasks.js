
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
  loadData();
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
  else if (text.startsWith ('check') ) {
  check(text);
  }
  else if (text.startsWith ('uncheck') ) {
  uncheck(text);
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
  saveData(); // save to disk before quitting
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
      9. check <task number> - marks the task as done
      10. uncheck <task number> - mrks the task as undone
      
  `);
  }

let tasks = [
  { text: "get milk", done: false },
  { text: "do hm", done: true}
   ]; //initialize empty array to store task


function list(){
  if (tasks.length === 0){ //if ther r no tasks
    console.log('no tasks to display');
  } else { 
    console.log('task list:');
    tasks.forEach((task, index ) => {  // prnting each task with its index
       const status = task.done ? '[✔]' : '[]' ; //done or undone
       console.log (`${index +1}. ${status} . ${task} `); // prnts task with its nb
    });
  }
}


function add(text){
  const parts = text.trim().split(' '); // split input text
  const task = parts.slice(1).join(' '); //takes evrythng after the (add x)
  if (taskText){ 
     tasks.push( { text: taskText, done: false } ); 
     console.log(`task added: ${taskText} `); // prnts msg confrmng task was added
  } else { //no task dscrption is provided
     console.log('error');
  }
}



function remove(text) {
    const parts = text.trim().split(' '); // Split input into parts
    const index = parts[1]; // asign the 2 word frm split inpt
   
    if (isNaN(index)) {   // cheks indx is NaN, rmv last task
       if (tasks.length > 0) { // eza at least aando 1task
          console.log(`Removed task: ${tasks.pop() } ` );
       }  else { //saret empty ma 3ad fi task ==0
          console.log('Error: No tasks to remove.');
       }  
    }
    else if (index >= 0 && index < tasks.length) {  //if true,rmv task at the given indx
      console.log(`Removed task: ${tasks.splice(index, 1)} `); //rmv at positn specified
    } 
    else { 
      console.log(`Error: Task number ${index + 1} does not exist.`); //
    }
  }


function edit(text){
    const parts = text.trim().split(' '); // Split input into parts
    const index = parts[1]; 
    const newTask = parts.slice(2).join(' '); 
  
    if (!index) { //input just edit
      console.log('Error ');
    } else if (!newTask && tasks.length > 0) {  //ther r existng tasks in the array
      tasks[tasks.length - 1] = index; // updte last task in array
      console.log(`Last task edited to: ${index} `);
    } else {
      const taskIndex = index -1; //cnvrts into 0-based indx
      if (taskIndex >= 0 && taskIndex < tasks.length) { //cheks  is a valid index
      tasks[taskIndex] = newTask; // updt task at specified indx wth new tsk
      console.log(`Task ${index} edited to: ${newTask} `); 
      } else {  //out of bounds
      console.log(`error: task nb ${index} does not exist.`);
        }
       }   
     }

     
function check(text) {
    const parts = text.trim().split(' ');
    const index = parseInt(parts[1]) - 1;
    if (!isNaN(index) && index >= 0 && index < tasks.length) {
      tasks[index].done = true;
      console.log(`Task ${index + 1} marked as done.`);
      } else {
      console.log('Error: Invalid task number.');
      }
    }

 function uncheck(text) {
     const parts = text.trim().split(' ');
     const index = parseInt(parts[1]) - 1;
     if (!isNaN(index) && index >= 0 && index < tasks.length) {
        tasks[index].done = false;
        console.log(`Task ${index + 1} marked as undone. `);
      } else {
        console.log('Error: Invalid task number.');
      }
    }

const fs = require ('fs');

function saveData() {
  const data = JSON.stringify(tasks, null, 2); // Convert tasks array to JSON
  fs.writeFileSync(filePath, data, 'utf8'); // Save data to file
  console.log('Tasks saved to', filePath);
}

function loadData() {
  try {
      const data = fs.readFileSync(filePath, 'utf8'); // Read file content
      tasks = JSON.parse(data); // Parse JSON data into the tasks array
      console.log('Tasks loaded from', filePath);
  } catch (error) {
      console.log('No previous tasks found or error reading file:', error.message);
      tasks = []; // Initialize with an empty array if file doesn't exist
  }
}


// The following line starts the application
startApp("zeinab hoteit")


