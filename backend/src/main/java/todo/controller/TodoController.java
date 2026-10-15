package todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Sort;

import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Optional;

import todo.repository.TodoRepository;
import todo.service.TodoService;
import todo.entity.Todo;

@Slf4j
@RestController
@RequestMapping("/todo")

// @CrossOrigin(origins="http://localhost:7002") // Weblogic
// @CrossOrigin(origins="http://localhost:5173") // react
@CrossOrigin(origins = "${app.frontend.url}")
public class TodoController {

	@Autowired
	private TodoRepository todoRepository;

	@Autowired
	private TodoService todoService;

	// save or create task in todo list
	@PostMapping("/create")
	public ResponseEntity<String> createTodo(@RequestBody Todo todo) {
		try {
			log.info("-- create --");

			/*
			 * Date date = new Date();
			 * Calendar cal = new GregorianCalendar();
			 * cal.setTime(date);
			 * SimpleDateFormat indianFormat = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
			 * String createdOn = indianFormat.format(cal.getTime());
			 * todo.setCreatedOn(createdOn);
			 */
			boolean status = todoRepository.save(todo) != null;
			return status
					? ResponseEntity.status(HttpStatus.CREATED).body("Task Successfully Created")
					: ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error Creating Task");
		} catch (Exception e) {
			log.info(" Exception createTodo  e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	// get all the tasks irrespective of status active or completed.
	@GetMapping("/retrieve")
	public List<Todo> getTodo() {
		log.info("-- retrieve --");
		try {
			// Sort sort = Sort.by("isActive").descending().and(Sort.by("id").descending());
			Sort sort = Sort.by("isActive").descending().and(Sort.by("updatedOn").descending());
			List<Todo> todoList = todoRepository.findAll(sort);
			return todoList;
		} catch (Exception e) {
			log.info(" Exception createTodo  e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	// update all the tasks
	@PutMapping("/update")
	public ResponseEntity<String> updateTodo(@RequestParam(value = "desc", required = false) String desc,
			@RequestParam(value = "isActive", required = false) boolean isActive, @RequestParam("id") long id) {
		log.info("-- updateTodo --");
		try {
			System.out.println("isActive " + isActive);
			System.out.println("desc " + desc);
			Optional<Todo> todoList = todoRepository.findById(id);
			if (todoList.isPresent() && desc != null && desc.length() > 0) {
				Todo todo = todoList.get();
				todo.setDesc(desc);
				todoRepository.save(todo);
				return ResponseEntity.ok("Task Successfully Updated");

			} else if (todoList.isPresent()) {
				Todo todo = todoList.get();
				todo.setActive(isActive);
				todoRepository.save(todo);
				return ResponseEntity.ok("Task Successfully Updated");

			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body("Task not found with id: " + id);
			}
		} catch (Exception e) {
			log.info(" Exception updateTodo  e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}

	}

	// clear or delete completed task from todo list
	@DeleteMapping("/delete")
	public ResponseEntity<String> clearCompleted() {
		try {
			int rows = todoService.clearAllCompletedTasks();
			return rows > 0
					? ResponseEntity.ok("All Completed Tasks cleared")
					: ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error Clearing Completed Tasks");
		} catch (Exception e) {
			log.info(" Exception clearCompleted  e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	// get all active tasks from todo list
	@GetMapping("/active")
	public List<Todo> getActiveTasks() {
		try {
			List<Todo> todoList = todoService.getAllActiveTasks();
			return todoList;
		} catch (Exception e) {
			log.info(" Exception getActiveTasks  e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	// get all completed or inactive tasks from todo list
	@GetMapping("/completed")
	public List<Todo> getCompletedTasks() {
		try {
			List<Todo> todoList = todoService.getAllCompletedTasks();
			return todoList;
		} catch (Exception e) {
			log.info(" Exception getCompletedTasks  e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	// clear task idWise
	@DeleteMapping("/clearIdWise/{id}/clear")
	public ResponseEntity<String> clearTaskIdWise(@PathVariable("id") long id) {
		log.info("-- clearTaskIdWise --");
		try {
			int rows = todoService.clearIdWise(id);
			return rows > 0 ? ResponseEntity.ok("Task Cleared Successfully")
					: ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error Clearing This Task");
		} catch (Exception e) {
			log.info(" Exception clearTaskIdWise  e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}

	}

	/*
	 * JPA Repository returns entity when saved crudrepositore returns id when saved
	 */
}