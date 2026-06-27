const form = document.querySelector("#signup-form");
const accessKey = document.querySelector("#access-key");
const confirmAccessKey = document.querySelector("#confirm-access-key");
const formStatus = document.querySelector("#form-status");
const fields = document.querySelectorAll("input, select");

fields.forEach((field) => {
    field.addEventListener("blur", () => {
        field.classList.add("touched");
    });
});

function validateAccessKeys() {
    const passwordsDoNotMatch =
        confirmAccessKey.value !== "" &&
        accessKey.value !== confirmAccessKey.value;

    if (passwordsDoNotMatch) {
        confirmAccessKey.setCustomValidity("Access keys do not match.");
    } else {
        confirmAccessKey.setCustomValidity("");
    }
}

accessKey.addEventListener("input", validateAccessKeys);
confirmAccessKey.addEventListener("input", validateAccessKeys);

form.addEventListener("submit", (event) => {
    event.preventDefault();

    fields.forEach((field) => {
        field.classList.add("touched");
    });

    validateAccessKeys();

    if (!form.checkValidity()) {
        formStatus.textContent = "Access denied: please review the highlighted fields.";
        formStatus.className = "form-status error";
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.protocolsAccepted = formData.has("protocolsAccepted");

    console.table(data);

    formStatus.textContent = "Access granted: Solaris ID initialized successfully.";
    formStatus.className = "form-status success";

    form.reset();

    fields.forEach((field) => {
        field.classList.remove("touched");
    });
});