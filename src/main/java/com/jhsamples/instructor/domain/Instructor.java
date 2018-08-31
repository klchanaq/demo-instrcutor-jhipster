package com.jhsamples.instructor.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Instructor.
 */
@Entity
@Table(name = "instructor")
public class Instructor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @OneToOne
    @JoinColumn(unique = true)
    private Instructordetail instructordetail;

    @OneToMany(mappedBy = "instructor")
    private Set<Course> courses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Instructor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public Instructor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instructordetail getInstructordetail() {
        return instructordetail;
    }

    public Instructor instructordetail(Instructordetail instructordetail) {
        this.instructordetail = instructordetail;
        return this;
    }

    public void setInstructordetail(Instructordetail instructordetail) {
        this.instructordetail = instructordetail;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Instructor courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Instructor addCourses(Course course) {
        this.courses.add(course);
        course.setInstructor(this);
        return this;
    }

    public Instructor removeCourses(Course course) {
        this.courses.remove(course);
        course.setInstructor(null);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Instructor instructor = (Instructor) o;
        if (instructor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), instructor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Instructor{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
