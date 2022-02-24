package com.myApi.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myApi.app.entity.Task;
import com.myApi.app.repository.dao.TaskRepository;

@Service
public  class TaskServiceImp implements TaskService {
	
	@Autowired
	private TaskRepository taskRepository;

	@Override
	@Transactional(readOnly=true)
	public Iterable<Task> findAll() {
		
		return taskRepository.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Page<Task> findAll(Pageable pageable) {
		
		return taskRepository.findAll(pageable);
	}

	@Override
	@Transactional(readOnly=true)
	public Optional<Task> findById(Long id) {
		
		return taskRepository.findById(id);
	}

	@Override
	@Transactional
	public Task save(Task task) {
		
		return taskRepository.save(task);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		taskRepository.deleteById(id);
		
	}
	
	

}
