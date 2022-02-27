package com.myApi.app.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myApi.app.entity.Task;
import com.myApi.app.service.TaskService;


@CrossOrigin (origins ="http://localhost:3000")
@RestController
@RequestMapping("/myapi/task")
public class TaskController {

	@Autowired
	private TaskService taskService;

	// Create a new task
	@PostMapping
	public ResponseEntity<?> create(@RequestBody Task task) {

		return ResponseEntity.status(HttpStatus.CREATED).body(taskService.save(task));

	}

	// Read a Task
	@GetMapping("/{id}")
	public ResponseEntity<?> read(@PathVariable(value = "id") Long taskId) {
		Optional<Task> oTask = taskService.findById(taskId);

		if (!oTask.isPresent()) {

			return ResponseEntity.notFound().build();

		}

		return ResponseEntity.ok(oTask);

	}
	
	// Update a task
	@PutMapping("/{id}")
	public ResponseEntity<?> update (@RequestBody Task taskDetails, @PathVariable (value ="id") Long taskId){
		
		Optional <Task> oTask= taskService.findById(taskId);
		
		if (!oTask.isPresent()) {
			
			return ResponseEntity.notFound().build();
			
		} 
		
		
		oTask.get().setDescription(taskDetails.getDescription());
		return ResponseEntity.status(HttpStatus.CREATED).body(taskService.save(oTask.get()));
	}
	
	
	
	@PutMapping("/completado/{id}")
	public ResponseEntity<?> updateCompleted (@PathVariable (value ="id") Long taskId){
		
		Optional <Task> oTask= taskService.findById(taskId);
		
		if (!oTask.isPresent()) {
			
			return ResponseEntity.notFound().build();
			
		} 
		
		
		oTask.get().setCompletado(!oTask.get().isCompletado());
		return ResponseEntity.status(HttpStatus.CREATED).body(taskService.save(oTask.get()));
	}
	
	
	
	//Delete a task
	
	@DeleteMapping ("/{id}")
	public ResponseEntity <?> delete(@PathVariable (value="id") Long taskId) {
		
		if (!taskService.findById(taskId).isPresent()) {
			
			return ResponseEntity.notFound().build();
			
		}
		
		
		taskService.deleteById(taskId);
		return ResponseEntity.ok().build();
		
	}
	
	//Read all Tasks
	
	@GetMapping 
	public List<Task> readAll (){
		
		List<Task> allTasks = StreamSupport
				.stream(taskService.findAll().spliterator(), false)
				.collect(Collectors.toList());

		
		return allTasks;
	}
	
	

}
