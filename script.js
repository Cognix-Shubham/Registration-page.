
const form = document.getElementById("registrationForm");

const photoInput = document.getElementById("photo");

const preview = document.getElementById("preview");

const overlay = document.getElementById("overlay");


// ==================================
// 1. STUDENT PHOTO PREVIEW
// ==================================

photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        preview.hidden = true;
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image!");

        this.value = "";
        preview.hidden = true;

        return;
    }

    // Maximum photo size: 5 MB
    if (file.size > 5 * 1024 * 1024) {
        alert("Photo size must be less than 5 MB!");

        this.value = "";
        preview.hidden = true;

        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        preview.src = event.target.result;
        preview.hidden = false;
    };

    reader.readAsDataURL(file);

});


// ==================================
// 2. FORM SUBMISSION
// ==================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const course =
        document.getElementById("course").value;

    const dob =
        document.getElementById("dob").value;


    // ==================================
    // 3. VALIDATION
    // ==================================

    if (password.length < 8) {

        alert("Password must contain at least 8 characters!");

        return;
    }

    if (password !== confirmPassword) {

        alert("Password and Confirm Password do not match!");

        return;
    }

    if (!/^\d{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit phone number!");

        return;
    }

    if (dob > new Date().toISOString().split("T")[0]) {

        alert("Date of birth cannot be in the future!");

        return;
    }

    const pin = document.getElementById("pin").value;

    if (pin && !/^\d{6}$/.test(pin)) {

        alert("Please enter a valid 6-digit PIN code!");

        return;
    }

    const marks10 = document.getElementById("marks10").value;
    const marks12 = document.getElementById("marks12").value;

    if (
        (marks10 !== "" && (+marks10 < 0 || +marks10 > 100)) ||
        (marks12 !== "" && (+marks12 < 0 || +marks12 > 100))
    ) {

        alert("Percentage must be between 0 and 100!");

        return;
    }

    // ==================================
    // 4. GENERATE STUDENT ID
    // ==================================

    const studentID =
        "NG" + Date.now().toString().slice(-8);


    // ==================================
    // 5. GET SELECTED OPTIONS
    // ==================================

    function getSelected(name) {

        return Array.from(
            document.querySelectorAll(
                `input[name="${name}"]:checked`
            )
        ).map(item => item.value).join(", ") || "Not selected";

    }


    const studentDetails = {

        name: firstName + " " + lastName,

        email: email,

        phone: phone,

        gender: document.getElementById("gender").value,

        course: course,

        specialization:
            document.getElementById("specialization").value || "Not selected",

        academicYear:
            document.getElementById("academicYear").value || "Not selected",

        city:
            document.getElementById("city").value || "Not provided",

        skills: getSelected("skills"),

        hobbies: getSelected("hobbies"),

        languages: getSelected("languages")

    };


    // ==================================
    // 6. SHOW SUCCESS POPUP
    // ==================================

    document.getElementById("studentId").textContent =
        "Student ID: " + studentID;

    const detailsBox =
        document.getElementById("studentDetails");

    detailsBox.replaceChildren();

    const fields = [
        ["Name", studentDetails.name],
        ["Email", studentDetails.email],
        ["Phone", studentDetails.phone],
        ["Gender", studentDetails.gender],
        ["Course", studentDetails.course],
        ["Specialization", studentDetails.specialization],
        ["Academic Year", studentDetails.academicYear],
        ["City", studentDetails.city],
        ["Skills", studentDetails.skills],
        ["Hobbies", studentDetails.hobbies],
        ["Languages", studentDetails.languages]
    ];

    fields.forEach(function (field) {

        const paragraph = document.createElement("p");

        const label = document.createElement("strong");

        label.textContent = field[0] + ": ";

        paragraph.appendChild(label);

        paragraph.appendChild(
            document.createTextNode(field[1])
        );

        detailsBox.appendChild(paragraph);

    });

    overlay.style.display = "flex";

});


// ==================================
// 7. CLOSE SUCCESS POPUP
// ==================================

document.getElementById("closeBtn").addEventListener("click", function () {

    overlay.style.display = "none";

    form.reset();

    preview.src = "";
    preview.hidden = true;

});


// ==================================
// 8. RESET FORM
// ==================================

form.addEventListener("reset", function () {

    preview.src = "";
    preview.hidden = true;

});
