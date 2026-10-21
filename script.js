const internships = [
    {
        id: 1,
        title: "Web Development Intern",
        company: "Bright Solutions",
        category: "Web Development",
        location: "Remote",
        stipend: "₹8,000/month",
        duration: "3 Months",
        description: "Learn HTML, CSS and JavaScript by working on website projects."
    },
    {
        id: 2,
        title: "Python Developer Intern",
        company: "Tech World",
        category: "Python",
        location: "Chennai",
        stipend: "₹10,000/month",
        duration: "4 Months",
        description: "Work with Python and learn the basics of backend development."
    },
    {
        id: 3,
        title: "UI/UX Design Intern",
        company: "Creative Studio",
        category: "Design",
        location: "Remote",
        stipend: "₹6,000/month",
        duration: "3 Months",
        description: "Create website designs and learn about user experience."
    },
    {
        id: 4,
        title: "Data Analyst Intern",
        company: "Data Point",
        category: "Data Analysis",
        location: "Coimbatore",
        stipend: "₹9,000/month",
        duration: "3 Months",
        description: "Learn data analysis using Excel, Python and SQL."
    },
    {
        id: 5,
        title: "Frontend Developer Intern",
        company: "Web Makers",
        category: "Web Development",
        location: "Remote",
        stipend: "₹7,000/month",
        duration: "2 Months",
        description: "Build responsive websites using HTML, CSS and JavaScript."
    },
    {
        id: 6,
        title: "Python Programming Intern",
        company: "Code Hub",
        category: "Python",
        location: "Trichy",
        stipend: "₹8,000/month",
        duration: "3 Months",
        description: "Practice Python programming and develop small applications."
    }
];


let saved = JSON.parse(localStorage.getItem("savedInternships")) || [];


let applications = JSON.parse(localStorage.getItem("myApplications")) || [];







function displayInternships(list=internships) {
    const container = document.getElementById("internshipList");


    if (list.length === 0) {
        container.innerHTML = "<p>No internships found.</p>";
        return;
    }


    container.innerHTML = list.map(function (item) {
        const isSaved = saved.includes(item.id); 


        return `
            <div class="card">
                <h3>${item.title}</h3>


                <p><strong>Company:</strong> ${item.company}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Stipend:</strong> ${item.stipend}</p>
                <p><strong>Duration:</strong> ${item.duration}</p>


                <button class="apply-btn" onclick="applyInternship(${item.id})">
                    Apply Now
                </button>


                <button class="save-btn" onclick="saveInternship(${item.id})">
                    ${isSaved ? "Saved ♥" : "Save ♡"}
                </button>


                <button onclick="viewDetails(${item.id})">
                    View Details
                </button>
            </div>
        `;
    }).join("");
}




function filterInternships() {
    const search = document.getElementById("search")
        .value.toLowerCase().trim();


    const category = document.getElementById("category").value;


    const filtered = internships.filter(function (item) {
        const matchesSearch =
            item.title.toLowerCase().includes(search) ||
            item.company.toLowerCase().includes(search);


        const matchesCategory =
            category === "All" || item.category === category;


        return matchesSearch && matchesCategory;
    });


    displayInternships(filtered);
}


document.getElementById("search").addEventListener("input", filterInternships);


document.getElementById("category").addEventListener("change", filterInternships);




// View internship details


function viewDetails(id) {
    const item = internships.find(function (internship) {
        return internship.id === id;
    });


    alert(
        "Internship Details\n\n" +
        "Role: " + item.title + "\n" +
        "Company: " + item.company + "\n" +
        "Location: " + item.location + "\n" +
        "Stipend: " + item.stipend + "\n" +
        "Duration: " + item.duration + "\n\n" +
        item.description
    );
}




// Apply for an internship


function applyInternship(id) {
    const alreadyApplied = applications.some(function (app) {
        return app.id === id;
    });


    if (alreadyApplied) {
        alert("You have already applied for this internship.");
        return;
    }


    applications.push({
        id: id,
        status: "Applied"
    });


    localStorage.setItem("myApplications", JSON.stringify(applications));


    displayApplications();


    alert("Your application has been added successfully!");
}




// Display applications


function displayApplications() {
    const container = document.getElementById("applicationsList");


    if (applications.length === 0) {
        container.innerHTML = "<p>No applications yet.</p>";
        return;
    }


    container.innerHTML = applications.map(function (app) {
        const item = internships.find(function (internship) {
            return internship.id === app.id;
        });


        return `
            <div class="application-item">
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.company}</p>
                </div>


                <span class="status">${app.status}</span>
            </div>
        `;
    }).join("");
}




// Save or remove a favorite internship


function saveInternship(id) {
    if (saved.includes(id)) {
        saved = saved.filter(function (savedId) {
            return savedId !== id;
        });


        alert("Internship removed from saved list.");
    } else {
        saved.push(id);


        alert("Internship saved successfully!");
    }


    localStorage.setItem("savedInternships", JSON.stringify(saved));
    displaySaved()

    displayInternships(
        internships.filter(function (item) {
            const search = document.getElementById("search")
                .value.toLowerCase();


            const category = document.getElementById("category").value;


            return (
                (item.title.toLowerCase().includes(search) ||
                 item.company.toLowerCase().includes(search)) &&
                (category === "All" || item.category === category)
            );
        })
    );


    displaySaved();
}




// Display saved internships


function displaySaved() {
    const container = document.getElementById("saveList");

      if(!container){
        console.log("saveList not found")
        return;
      }
    const savedInternships = internships.filter(function (item) {
        return saved.includes(item.id);
    });


    if (savedInternships.length === 0) {
        container.innerHTML = "<p>No saved internships yet.</p>";
        return;
    }


    container.innerHTML = savedInternships.map(function (item) {
        return `
            <div class="card">
                <h3>${item.title}</h3>
                <p>${item.company}</p>
                <p>${item.location}</p>


                <button class="apply-btn" onclick="applyInternship(${item.id})">
                    Apply Now
                </button>


                <button class="save-btn" onclick="saveInternship(${item.id})">
                    Remove
                </button>
            </div>
        `;
    }).join("");
}






displayInternships(internships);
displayApplications();
displaySaved();