
package todo.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.EntityListeners;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "todo_app")
public class Todo {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "id")
	private Long id;

	@Column(name = "is_active") // check if default value can be assigned
	private boolean isActive = true;

	@Column(name = "description", length = 1000, nullable = false) // check nullable
	private String desc;

	@CreatedDate
	@Column(name = "created_on", updatable = false)
	private LocalDateTime createdOn;

	@LastModifiedDate
	@Column(name = "updated_on")
	private LocalDateTime updatedOn;

}

/*
 * default value 2 ways
 * assign value
 * private boolean isTrue=true;
 * or
 * 
 * @Column(ColumnDefinition="boolean default true ") for postgresql,oracle,h2
 * but
 * 
 * @Column(ColumnDefinition="tinyint(1) default 1 ") for mysql
 * 
 * 
 */