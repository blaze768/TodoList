var http = require('http');

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'}); //display as html

    console.log('Running mainapp.js');
 
    const fs = require('fs');
    const _ = require('lodash');
    const yargs = require('yargs');
    const prompt = require('prompt-sync')();
    const json = ("todos_data.json");
    
    const argv = yargs.argv;
    var command = argv._[0];
    
    console.log('Running Command: ', command);
    
    if (command === 'addTodo') {
        try {
            var todosString = fs.readFileSync('todos_data.json');
            var todos =  JSON.parse(todosString);
        } catch (e) {
            res.write(' ');
        }
        var todo = prompt('Item to add: ')
    
        todos.push(todo);
        fs.writeFileSync('todos_data.json', JSON.stringify(todos));

    } else if (command === 'deleteTodo') {
        try {
            var todosString = fs.readFileSync('todos_data.json');
            var todos =  JSON.parse(todosString);
        } catch (e) {
            res.write(' ');
        }

        var todo = prompt('Item to delete: ')
        json[todo] = null;
        delete json[todo];
        fs.writeFileSync('todos_data.json', JSON.stringify(todos));
        res.write('Item was deleted.');

    } else if (command === 'listTodos') {
        try {
            var todosString = fs.readFileSync('todos_data.json');
            var todos =  JSON.parse(todosString);
        } catch (e) {
            res.write(' ');
        }

        console.log(`Printing ${todos.length} todo(s).`);
        var i;
        for (i = 0; i < todos.length; i++){
            res.write(todos[i] + ', '); 
        }

    } else {
        res.write('Invalid command.');
    }
    res.end(); //end response
  }).listen(8080); //listens on port 8080