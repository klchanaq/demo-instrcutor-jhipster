package com.jhsamples.instructor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jhsamples.instructor.domain.Instructordetail;
import com.jhsamples.instructor.service.InstructordetailService;
import com.jhsamples.instructor.web.rest.errors.BadRequestAlertException;
import com.jhsamples.instructor.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Instructordetail.
 */
@RestController
@RequestMapping("/api")
public class InstructordetailResource {

    private final Logger log = LoggerFactory.getLogger(InstructordetailResource.class);

    private static final String ENTITY_NAME = "instructordetail";

    private final InstructordetailService instructordetailService;

    public InstructordetailResource(InstructordetailService instructordetailService) {
        this.instructordetailService = instructordetailService;
    }

    /**
     * POST  /instructordetails : Create a new instructordetail.
     *
     * @param instructordetail the instructordetail to create
     * @return the ResponseEntity with status 201 (Created) and with body the new instructordetail, or with status 400 (Bad Request) if the instructordetail has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/instructordetails")
    @Timed
    public ResponseEntity<Instructordetail> createInstructordetail(@RequestBody Instructordetail instructordetail) throws URISyntaxException {
        log.debug("REST request to save Instructordetail : {}", instructordetail);
        if (instructordetail.getId() != null) {
            throw new BadRequestAlertException("A new instructordetail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Instructordetail result = instructordetailService.save(instructordetail);
        return ResponseEntity.created(new URI("/api/instructordetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /instructordetails : Updates an existing instructordetail.
     *
     * @param instructordetail the instructordetail to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated instructordetail,
     * or with status 400 (Bad Request) if the instructordetail is not valid,
     * or with status 500 (Internal Server Error) if the instructordetail couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/instructordetails")
    @Timed
    public ResponseEntity<Instructordetail> updateInstructordetail(@RequestBody Instructordetail instructordetail) throws URISyntaxException {
        log.debug("REST request to update Instructordetail : {}", instructordetail);
        if (instructordetail.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Instructordetail result = instructordetailService.save(instructordetail);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, instructordetail.getId().toString()))
            .body(result);
    }

    /**
     * GET  /instructordetails : get all the instructordetails.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of instructordetails in body
     */
    @GetMapping("/instructordetails")
    @Timed
    public List<Instructordetail> getAllInstructordetails(@RequestParam(required = false) String filter) {
        if ("instructor-is-null".equals(filter)) {
            log.debug("REST request to get all Instructordetails where instructor is null");
            return instructordetailService.findAllWhereInstructorIsNull();
        }
        log.debug("REST request to get all Instructordetails");
        return instructordetailService.findAll();
    }

    /**
     * GET  /instructordetails/:id : get the "id" instructordetail.
     *
     * @param id the id of the instructordetail to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the instructordetail, or with status 404 (Not Found)
     */
    @GetMapping("/instructordetails/{id}")
    @Timed
    public ResponseEntity<Instructordetail> getInstructordetail(@PathVariable Long id) {
        log.debug("REST request to get Instructordetail : {}", id);
        Optional<Instructordetail> instructordetail = instructordetailService.findOne(id);
        return ResponseUtil.wrapOrNotFound(instructordetail);
    }

    /**
     * DELETE  /instructordetails/:id : delete the "id" instructordetail.
     *
     * @param id the id of the instructordetail to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/instructordetails/{id}")
    @Timed
    public ResponseEntity<Void> deleteInstructordetail(@PathVariable Long id) {
        log.debug("REST request to delete Instructordetail : {}", id);
        instructordetailService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
