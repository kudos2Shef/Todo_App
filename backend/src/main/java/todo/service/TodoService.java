package todo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import todo.repository.TodoRepository;
import todo.entity.Todo;

@Slf4j
@Service
public class TodoService {

	@Autowired
	private TodoRepository todoRepository;

	public int clearAllCompletedTasks() {
		log.info("-- clearAllCompletedTasks --");
		try {
			return todoRepository.clearAllCompletedTasks();
		} catch (Exception e) {
			log.info("Service clearAllCompletedTasks Exception e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	public List<Todo> getAllActiveTasks() {
		log.info("-- getAllActiveTasks --");
		try {
			return todoRepository.allActiveTasks();
		} catch (Exception e) {
			log.info("Service getAllActiveTasks Exception e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	public List<Todo> getAllCompletedTasks() {
		log.info("-- getAllCompletedTasks --");
		try {
			return todoRepository.allCompletedTasks();
		} catch (Exception e) {
			log.info("Service getAllCompletedTasks Exception e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	public int clearIdWise(long id) {
		log.info("-- clearIdWise --");
		try {
			return todoRepository.clearIdWise(id);
		} catch (Exception e) {
			log.info("Service clearIdWise Exception e:" + e);
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

}