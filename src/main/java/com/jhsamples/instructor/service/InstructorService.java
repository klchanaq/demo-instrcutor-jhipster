package com.jhsamples.instructor.service;

import com.jhsamples.instructor.domain.Instructor;
import com.jhsamples.instructor.repository.InstructorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Instructor.
 */
@Service
@Transactional
public class InstructorService {

    private final Logger log = LoggerFactory.getLogger(InstructorService.class);

    private final InstructorRepository instructorRepository;

    public InstructorService(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    /**
     * Save a instructor.
     *
     * @param instructor the entity to save
     * @return the persisted entity
     */
    public Instructor save(Instructor instructor) {
        log.debug("Request to save Instructor : {}", instructor);        return instructorRepository.save(instructor);
    }

    /**
     * Get all the instructors.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Instructor> findAll() {
        log.debug("Request to get all Instructors");
        return instructorRepository.findAll();
    }


    /**
     * Get one instructor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Instructor> findOne(Long id) {
        log.debug("Request to get Instructor : {}", id);
        return instructorRepository.findById(id);
    }

    /**
     * Delete the instructor by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Instructor : {}", id);
        instructorRepository.deleteById(id);
    }
}
