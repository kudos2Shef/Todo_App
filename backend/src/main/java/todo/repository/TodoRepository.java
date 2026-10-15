package todo.repository;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import java.util.List;

import todo.entity.Todo;

@Repository
@Transactional
public interface TodoRepository extends JpaRepository<Todo, Long> {

	@Modifying
	@Query("DELETE FROM Todo t where t.isActive=false")
	int clearAllCompletedTasks();

	// @Query("SELECT to FROM Todo to WHERE to.isActive=true ORDER BY to.id DESC")
	@Query("SELECT to FROM Todo to WHERE to.isActive=true ORDER BY to.updatedOn DESC")
	List<Todo> allActiveTasks();

	// @Query("SELECT t FROM Todo t where t.isActive=false ORDER BY t.id DESC")
	@Query("SELECT t FROM Todo t where t.isActive=false ORDER BY t.updatedOn DESC")
	List<Todo> allCompletedTasks();

	@Modifying
	@Query("DELETE FROM Todo to WHERE to.id=:id")
	int clearIdWise(@Param("id") long id);
}