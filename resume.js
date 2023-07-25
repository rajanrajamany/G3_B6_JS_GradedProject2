document.addEventListener('DOMContentLoaded', () => {

  let applicants = [];
  let filteredData = [];
  let search_press = false;
  let counter = 0;

  function displayApplicant(applicant) {

    document.getElementById('name').textContent = applicant.basics.name;
    document.getElementById('appliedFor').textContent = applicant.basics.AppliedFor;
    document.getElementById('email').textContent = applicant.basics.email;
    document.getElementById('phone').textContent = applicant.basics.phone;

    document.getElementById('network').textContent = applicant.basics.profiles.network;

    var stKeywords = applicant.skills.keywords;
    let tmpKeywords = "";
    for (let i = 0; i < stKeywords.length; i++) {
      tmpKeywords += stKeywords[i] + "<br>";
    }
    document.getElementById('keywords').innerHTML = tmpKeywords;
    let br1 = "";
    for (let i = 0; i < stKeywords.length; i++) {
      br1 += "<br>";
    }

    document.getElementById('br1').innerHTML = br1;

    document.getElementById('CompanyName').textContent = applicant.work['Company Name'];
    document.getElementById('Position').textContent = applicant.work.Position;
    document.getElementById('StartDate').textContent = applicant.work['Start Date'];
    document.getElementById('EndDate').textContent = applicant.work['End Date'];
    document.getElementById('Summary').textContent = applicant.work.Summary;

    document.getElementById('internship-company-name').textContent = applicant.Internship['Company Name'];
    document.getElementById('internship-position').textContent = applicant.Internship.Position;
    document.getElementById('internship-start-date').textContent = applicant.Internship['Start Date'];
    document.getElementById('internship-end-date').textContent = applicant.Internship['End Date'];
    document.getElementById('internship-summary').textContent = applicant.Internship.Summary;

    document.getElementById('project-name').textContent = applicant.projects.name;
    document.getElementById('project-description').textContent = applicant.projects.description;

    document.getElementById('ug-institute').textContent = applicant.education.UG.institute;
    document.getElementById('ug-course').textContent = applicant.education.UG.course;
    document.getElementById('ug-start-date').textContent = applicant.education.UG['Start Date'];
    document.getElementById('ug-end-date').textContent = applicant.education.UG['End Date'];
    document.getElementById('ug-cgpa').textContent = applicant.education.UG.cgpa;

    document.getElementById('ss-institute').textContent = applicant.education['Senior Secondary'].institute;
    document.getElementById('ss-cgpa').textContent = applicant.education['Senior Secondary'].cgpa;

    document.getElementById('school-institute').textContent = applicant.education['High School'].institute;
    document.getElementById('school-cgpa').textContent = applicant.education['High School'].cgpa;

    document.getElementById('summary').textContent = applicant.achievements.Summary;

    var stHobby = applicant.interests.hobbies;
    let tmpHobbies = "";
    for (let i = 0; i < stHobby.length; i++) {
      tmpHobbies += stHobby[i] + "<br>";
    }

    document.getElementById('hobbies').innerHTML = tmpHobbies;

    let br2 = "";
    for (let i = 0; i < stHobby.length; i++) {
      br2 += "<br>";
    }
    document.getElementById('br2').innerHTML = br2;
  }


  function fetchData() {

    fetch('http://localhost/Data.json')
      .then(response => response.json())
      .then(data => {
        applicants = data.resume;
        displayApplicant(applicants[0]);
        document.getElementById('prevBtn').style.visibility = "hidden";
      })
      .catch(error => {
        resultsDiv.innerHTML = '<p>Error loading data</p>';
        console.log('Error loading data:', error);
      });
  }

  fetchData();


  let dataFound = true;
  var resultsDiv = document.getElementById("results");

  function enableButton() {
    if (search_press) {
      if (dataFound) {
        if (counter === filteredData.length - 1) {
          document.getElementById('nextBtn').style.visibility = "hidden";
        } else if (counter < filteredData.length - 1) {
          document.getElementById('nextBtn').style.visibility = "visible";
        }

      } else {
        document.getElementById('nextBtn').style.visibility = "hidden";
      }
    } else {
      if (counter === applicants.length - 1) {
        document.getElementById('nextBtn').style.visibility = "hidden";
      } else {
        document.getElementById('nextBtn').style.visibility = "visible";
      }

    }
    if (counter > 0) {
      document.getElementById('prevBtn').style.visibility = "visible";
    } else {
      document.getElementById('prevBtn').style.visibility = "hidden";
    }
  }

  function displayApplicantByJob(job) {
    filteredData = applicants.filter(item => item.basics.AppliedFor.toLowerCase().includes(job.toLowerCase()));
    counter = 0;
    console.log(filteredData.length);

    if (filteredData.length === 0) {

      dataFound = false;
      console.log(dataFound);

    } else {

      const result = filteredData[0];
      displayApplicant(result);
      dataFound = true;
    }

    var dataFoundElem = document.getElementById("data-found");
    var noDataFoundElem = document.getElementById("no-data-found");

    console.log(dataFound);
    if (dataFound) {
      dataFoundElem.style.display = "block";
      noDataFoundElem.style.display = "none";
    } else {
      dataFoundElem.style.display = "none";
      noDataFoundElem.style.display = "block";
    }
    enableButton();
  }


  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  document.addEventListener('keypress', (event) => {

    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });

  document.addEventListener('keyup', (event) => {

    if (event.key === 'Enter') {
      event.preventDefault();
    } else {
      const searchTerm = document.getElementById('search-input').value.trim();

      if (searchTerm === '') {
        var dataFoundElem = document.getElementById("data-found");
        var noDataFoundElem = document.getElementById("no-data-found");
        dataFoundElem.style.display = "block";
        noDataFoundElem.style.display = "none";

        displayApplicant(applicants[0]);

        search_press = false;
        enableButton();
      } else {
        search_press = true;
        displayApplicantByJob(searchTerm);
      }
    }

  }
  );

  let nextBtn = document.getElementById('nextBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (search_press) {
        if (counter < filteredData.length - 1) {
          counter++;
          displayApplicant(filteredData[counter]);
          enableButton();
        }
      }
      else {
        if (counter < applicants.length - 1) {
          counter++;
          displayApplicant(applicants[counter]);
          enableButton();
        }
      }
    });
  }

  let prevBtn = document.getElementById('prevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (search_press) {
        if (counter > 0) {
          counter--;
          displayApplicant(filteredData[counter]);
        }
      }
      else {
        if (counter > 0) {
          counter--;
          displayApplicant(applicants[counter]);
        }
      }
      enableButton();
    });
  }
});
