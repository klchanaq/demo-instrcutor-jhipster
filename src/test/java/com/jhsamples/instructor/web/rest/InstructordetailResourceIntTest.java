package com.jhsamples.instructor.web.rest;

import com.jhsamples.instructor.JhInstructorDemoApp;

import com.jhsamples.instructor.domain.Instructordetail;
import com.jhsamples.instructor.repository.InstructordetailRepository;
import com.jhsamples.instructor.service.InstructordetailService;
import com.jhsamples.instructor.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.jhsamples.instructor.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InstructordetailResource REST controller.
 *
 * @see InstructordetailResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhInstructorDemoApp.class)
public class InstructordetailResourceIntTest {

    private static final String DEFAULT_YOUTUBE_CHANNEL = "AAAAAAAAAA";
    private static final String UPDATED_YOUTUBE_CHANNEL = "BBBBBBBBBB";

    private static final String DEFAULT_HOBBY = "AAAAAAAAAA";
    private static final String UPDATED_HOBBY = "BBBBBBBBBB";

    @Autowired
    private InstructordetailRepository instructordetailRepository;

    

    @Autowired
    private InstructordetailService instructordetailService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInstructordetailMockMvc;

    private Instructordetail instructordetail;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InstructordetailResource instructordetailResource = new InstructordetailResource(instructordetailService);
        this.restInstructordetailMockMvc = MockMvcBuilders.standaloneSetup(instructordetailResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instructordetail createEntity(EntityManager em) {
        Instructordetail instructordetail = new Instructordetail()
            .youtubeChannel(DEFAULT_YOUTUBE_CHANNEL)
            .hobby(DEFAULT_HOBBY);
        return instructordetail;
    }

    @Before
    public void initTest() {
        instructordetail = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstructordetail() throws Exception {
        int databaseSizeBeforeCreate = instructordetailRepository.findAll().size();

        // Create the Instructordetail
        restInstructordetailMockMvc.perform(post("/api/instructordetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instructordetail)))
            .andExpect(status().isCreated());

        // Validate the Instructordetail in the database
        List<Instructordetail> instructordetailList = instructordetailRepository.findAll();
        assertThat(instructordetailList).hasSize(databaseSizeBeforeCreate + 1);
        Instructordetail testInstructordetail = instructordetailList.get(instructordetailList.size() - 1);
        assertThat(testInstructordetail.getYoutubeChannel()).isEqualTo(DEFAULT_YOUTUBE_CHANNEL);
        assertThat(testInstructordetail.getHobby()).isEqualTo(DEFAULT_HOBBY);
    }

    @Test
    @Transactional
    public void createInstructordetailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = instructordetailRepository.findAll().size();

        // Create the Instructordetail with an existing ID
        instructordetail.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstructordetailMockMvc.perform(post("/api/instructordetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instructordetail)))
            .andExpect(status().isBadRequest());

        // Validate the Instructordetail in the database
        List<Instructordetail> instructordetailList = instructordetailRepository.findAll();
        assertThat(instructordetailList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInstructordetails() throws Exception {
        // Initialize the database
        instructordetailRepository.saveAndFlush(instructordetail);

        // Get all the instructordetailList
        restInstructordetailMockMvc.perform(get("/api/instructordetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instructordetail.getId().intValue())))
            .andExpect(jsonPath("$.[*].youtubeChannel").value(hasItem(DEFAULT_YOUTUBE_CHANNEL.toString())))
            .andExpect(jsonPath("$.[*].hobby").value(hasItem(DEFAULT_HOBBY.toString())));
    }
    

    @Test
    @Transactional
    public void getInstructordetail() throws Exception {
        // Initialize the database
        instructordetailRepository.saveAndFlush(instructordetail);

        // Get the instructordetail
        restInstructordetailMockMvc.perform(get("/api/instructordetails/{id}", instructordetail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(instructordetail.getId().intValue()))
            .andExpect(jsonPath("$.youtubeChannel").value(DEFAULT_YOUTUBE_CHANNEL.toString()))
            .andExpect(jsonPath("$.hobby").value(DEFAULT_HOBBY.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingInstructordetail() throws Exception {
        // Get the instructordetail
        restInstructordetailMockMvc.perform(get("/api/instructordetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstructordetail() throws Exception {
        // Initialize the database
        instructordetailService.save(instructordetail);

        int databaseSizeBeforeUpdate = instructordetailRepository.findAll().size();

        // Update the instructordetail
        Instructordetail updatedInstructordetail = instructordetailRepository.findById(instructordetail.getId()).get();
        // Disconnect from session so that the updates on updatedInstructordetail are not directly saved in db
        em.detach(updatedInstructordetail);
        updatedInstructordetail
            .youtubeChannel(UPDATED_YOUTUBE_CHANNEL)
            .hobby(UPDATED_HOBBY);

        restInstructordetailMockMvc.perform(put("/api/instructordetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInstructordetail)))
            .andExpect(status().isOk());

        // Validate the Instructordetail in the database
        List<Instructordetail> instructordetailList = instructordetailRepository.findAll();
        assertThat(instructordetailList).hasSize(databaseSizeBeforeUpdate);
        Instructordetail testInstructordetail = instructordetailList.get(instructordetailList.size() - 1);
        assertThat(testInstructordetail.getYoutubeChannel()).isEqualTo(UPDATED_YOUTUBE_CHANNEL);
        assertThat(testInstructordetail.getHobby()).isEqualTo(UPDATED_HOBBY);
    }

    @Test
    @Transactional
    public void updateNonExistingInstructordetail() throws Exception {
        int databaseSizeBeforeUpdate = instructordetailRepository.findAll().size();

        // Create the Instructordetail

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restInstructordetailMockMvc.perform(put("/api/instructordetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instructordetail)))
            .andExpect(status().isBadRequest());

        // Validate the Instructordetail in the database
        List<Instructordetail> instructordetailList = instructordetailRepository.findAll();
        assertThat(instructordetailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInstructordetail() throws Exception {
        // Initialize the database
        instructordetailService.save(instructordetail);

        int databaseSizeBeforeDelete = instructordetailRepository.findAll().size();

        // Get the instructordetail
        restInstructordetailMockMvc.perform(delete("/api/instructordetails/{id}", instructordetail.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Instructordetail> instructordetailList = instructordetailRepository.findAll();
        assertThat(instructordetailList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Instructordetail.class);
        Instructordetail instructordetail1 = new Instructordetail();
        instructordetail1.setId(1L);
        Instructordetail instructordetail2 = new Instructordetail();
        instructordetail2.setId(instructordetail1.getId());
        assertThat(instructordetail1).isEqualTo(instructordetail2);
        instructordetail2.setId(2L);
        assertThat(instructordetail1).isNotEqualTo(instructordetail2);
        instructordetail1.setId(null);
        assertThat(instructordetail1).isNotEqualTo(instructordetail2);
    }
}
