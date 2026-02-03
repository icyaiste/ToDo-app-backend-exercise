import readline from "node:readline";

// Define Todo type
type Todo = {
  id: number;
  text: string;
  category: string;
}

// Store todos in memory (array)
let todos: Todo[] = [];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Add a new todo
const addTodo = (): void => {
  rl.question("Enter task: ", (text: string) => {
    if (text.trim() === "") {
      console.log("Task cannot be empty!\n");
      showMenu();
      return;
    }
      rl.question("Enter category: ", (category: string) => {
        const newTodo: Todo = {
          id: Date.now(),
          text: text.trim(),
          category: category.trim() === "" ? "general" : category.trim(),
        };
       
       todos.push(newTodo);
      console.log("✓ Task added successfully!\n");
    showMenu();
  });
});
}

// List all todos
const listTodos = (): void => {
  console.clear();
  console.log("\n=== Todo List App ===");
  console.log("Commands: add, list, remove, exit\n");
  console.log(`You have ${todos.length} todos`);


  if (todos.length === 0) {
    console.log("No todos yet!\n");
  } else {
    console.log("Your Todos:")
    todos.forEach((todo: Todo) => {
    console.log(`${todo.id}. ${todo.text} [${todo.category}]`);
    });
    console.log("");
  }

  /*process.stdout.write("> ");
  rl.question("", (command: string) => {
    handleCommand(command);
  });*/
  rl.question("\nPress Enter to return to menu...", () => {
  showMenu();
});

};

//Show how many todos are present



// Remove a todo
const removeTodo = (): void => {
  rl.question("Enter task ID to remove: ", (input: string) => {
    const id: number = parseInt(input);

    // Use filter to create new array without the todo
    const updatedTodos: Todo[] = todos.filter((todo: Todo) => todo.id !== id);

    if (updatedTodos.length === todos.length) {
      console.log("Task not found!\n");
    } else {
      todos = updatedTodos;
      console.log("Task removed successfully!\n");
    }

    showMenu();
  });
};

// Handle command logic
const handleCommand = (command: string): void => {
  switch (command.trim().toLowerCase()) {
    case "add":
      addTodo();
      break;
    case "list":
      listTodos();
      break;
    case "remove":
      removeTodo();
      break;
    case "exit":
      console.log("Goodbye!");
      rl.close();
      break;
    default:
      console.log("Unknown command\n");
      showMenu();
  }
};

// Show menu and handle commands
const showMenu = (): void => {
  console.clear();
  console.log("\n=== Todo List App ===");
  console.log("Commands: add, list, remove, exit\n");
  process.stdout.write("> ");
  rl.question("", (command: string) => {
    handleCommand(command);
  });
};

// Start the app
console.log("\n=== Todo List App ===");
console.log("Commands: add, list, remove, exit\n");
showMenu();