package com.jhsamples.instructor.service;

import com.jhsamples.instructor.domain.Instructordetail;
import com.jhsamples.instructor.repository.InstructordetailRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
/**
 * Service Implementation for managing Instructordetail.
 */
@Service
@Transactional
public class InstructordetailService {

    private final Logger log = LoggerFactory.getLogger(InstructordetailService.class);

    private final InstructordetailRepository instructordetailRepository;

    public InstructordetailService(InstructordetailRepository instructordetailRepository) {
        this.instructordetailRepository = instructordetailRepository;
    }

    /**
     * Save a instructordetail.
     *
     * @param instructordetail the entity to save
     * @return the persisted entity
     */
    public Instructordetail save(Instructordetail instructordetail) {
        log.debug("Request to save Instructordetail : {}", instructordetail);        return instructordetailRepository.save(instructordetail);
    }

    /**
     * Get all the instructordetails.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Instructordetail> findAll() {
        log.debug("Request to get all Instructordetails");
        return instructordetailRepository.findAll();
    }



    /**
     *  get all the instructordetails where Instructor is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Instructordetail> findAllWhereInstructorIsNull() {
        log.debug("Request to get all instructordetails where Instructor is null");
        return StreamSupport
            .stream(instructordetailRepository.findAll().spliterator(), false)
            .filter(instructordetail -> instructordetail.getInstructor() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one instructordetail by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Instructordetail> findOne(Long id) {
        log.debug("Request to get Instructordetail : {}", id);
        return instructordetailRepository.findById(id);
    }

    /**
     * Delete the instructordetail by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Instructordetail : {}", id);
        instructordetailRepository.deleteById(id);
    }
}
