package com.jhsamples.instructor.repository;

import com.jhsamples.instructor.domain.Instructordetail;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Instructordetail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstructordetailRepository extends JpaRepository<Instructordetail, Long> {

}
