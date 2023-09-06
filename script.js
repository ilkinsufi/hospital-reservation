const sidebarSteps = document.querySelectorAll(".sidebarSteps li");
const steps = document.querySelectorAll(".step");
const backBtn = document.querySelector(".backBtn");
const nextBtn = document.querySelector(".nextBtn");
const contentMainTitle = document.querySelector(".contentMainTitle");
const staffContent = document.querySelector("#staffContent");
const serviceContent = document.querySelector("#serviceContent");
const noteStaff = document.querySelector("#noteStaff");
const noteService = document.querySelector("#noteService");
const noteDate = document.querySelector("#noteDate");
const notePrice = document.querySelector("#notePrice");
const warningBtn = document.querySelector(".warningBtn");

const nameinp = document.querySelector(".nameinp");
const surnameinp = document.querySelector(".surnameinp");
const einp = document.querySelector(".einp");
const telinp = document.querySelector(".telinp");
let currentStepIndex = 0;

const generalData = {
  staff_id: null,
  service_id: null,
  date: null,
  time: null,
  price: null,
  customer: {
    name: null,
    surname: null,
    email: null,
    phone: null,
  },
};

window.generalData = generalData;
// Staff data

const staff = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "./images/doctor1.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "./images/doctor2.png",
  },
];
const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "./images/Oval.png",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "./images/Oval2.png",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
  {
    id: 3,
    name: "Check up",
    image: "./images/Oval3.png",
    duration: "6 hour 30 minutes",
    price: 820.9,
  },
];

const stepTitles = [
  "Select staff",
  "Select service",
  "Select date & time",
  "Confirm details",
];

const loadData = () => {
  staff.map((a) => {
    let staffDiv = document.createElement("div");
    staffDiv.classList.add("staff");
    let staffImage = document.createElement("img");
    staffImage.classList.add("staffImage");
    staffImage.src = a.image;
    let staffDetails = document.createElement("div");
    staffDetails.classList.add("staffDetails");
    let staffDetailsP = document.createElement("p");
    staffDetailsP.classList.add("staffDetails");
    staffDetailsP.textContent = a.name;
    let staffDetailsSpan = document.createElement("span");
    staffDetailsSpan.classList.add("staffDetails");
    staffDetailsSpan.textContent = a.email;

    staffDetails.append(staffDetailsP, staffDetailsSpan);

    staffDiv.append(staffImage, staffDetails);
    staffContent.append(staffDiv);
    staffDiv.addEventListener("click", () => {
      const selectedStaffDivs = document.querySelectorAll(".staff.selected");

      // Remove "selected" class from other selected divs
      selectedStaffDivs.forEach((div) => {
        div.classList.remove("selected");
      });

      staffDiv.classList.add("selected");

      // next btn
      if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        updateStepDisplay();
      } else {
        steps[currentStepIndex].classList.add("done");
        updateStepDisplay();
        alert("Done");
      }
      // added Staff_id

      generalData.staff_id = a.id;

      console.log(generalData);
    });
  });
  services.map((serv) => {
    let serviceDiv = document.createElement("div");
    serviceDiv.classList.add("service");
    let serviceImage = document.createElement("img");
    serviceImage.classList.add("serviceImage");
    serviceImage.src = serv.image;
    let serviceDetails = document.createElement("div");
    serviceDetails.classList.add("serviceDetails");
    let serviceDetailsP = document.createElement("p");
    serviceDetailsP.textContent = serv.name;
    let serviceDetailsSpan = document.createElement("span");
    serviceDetailsSpan.textContent = serv.duration;
    let servicePrice = document.createElement("span");
    servicePrice.textContent = `${serv.price} $`;
    servicePrice.classList.add("servicePrice");
    serviceDetails.append(serviceDetailsP, serviceDetailsSpan);

    serviceDiv.append(serviceImage, serviceDetails, servicePrice);
    serviceContent.append(serviceDiv);

    serviceDiv.addEventListener("click", () => {
      const selectedServiceDivs =
        document.querySelectorAll(".service.selected");

      // Remove "selected" class from other selected divs
      selectedServiceDivs.forEach((div) => {
        div.classList.remove("selected");
      });

      serviceDiv.classList.add("selected");

      // added service_id

      // if (generalData.length > 0) {
      //   generalData.push({ service_id: serv.id });
      // } else {
      //   generalData.push();
      // }

      generalData.service_id = serv.id;
      generalData.price = serv.price;

      console.log(generalData);
      // next btn
      if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        updateStepDisplay();
      } else {
        steps[currentStepIndex].classList.add("done");
        updateStepDisplay();
        alert("Done");
      }
    });
  });
};
loadData();
function updateStepDisplay() {
  sidebarSteps.forEach((step, index) => {
    if (index === currentStepIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
    if (index < currentStepIndex) {
      step.classList.add("done");
      step.querySelector("span").textContent = "✓";
    } else {
      step.classList.remove("done");
      step.querySelector("span").textContent = index + 1;
    }
  });

  steps.forEach((step, index) => {
    if (index === currentStepIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  contentMainTitle.textContent = stepTitles[currentStepIndex];

  if (currentStepIndex === 0 && generalData.staff_id == null) {
    // warningBtn.classList.add("active");
    warningBtn.textContent = "Select Staff";
    nextBtn.disabled = true;

    setTimeout(() => {
      warningBtn.classList.remove("active");
    }, 2000);
  } else if (currentStepIndex === 1 && generalData.service_id == null) {
    warningBtn.textContent = "Select Service";
    nextBtn.disabled = true;

    setTimeout(() => {
      warningBtn.classList.remove("active");
    }, 2000);
  } else if (currentStepIndex === 2 && generalData.service_time == null) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = false;
  } //else if (currentStepIndex == 1 && generalData.service_id == null) {
  //   warningBtn.classList.add("active");
  //   warningBtn.textContent = "Select Service";

  //   setTimeout(() => {
  //     warningBtn.classList.remove("active");
  //   }, 2000);
  // }

  if (currentStepIndex === 0) {
    backBtn.disabled = true;
  } else {
    backBtn.disabled = false;
  }

  if (currentStepIndex === steps.length - 1) {
    nextBtn.textContent = "FINISH";
  } else {
    nextBtn.textContent = "NEXT";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentStepIndex < steps.length - 1) {
    currentStepIndex++;
    updateStepDisplay();
  } else {
    steps[currentStepIndex].classList.add("done");
    // alert("Done");
    if (
      currentStepIndex == 3 &&
      !nameinp.value &&
      !surnameinp.value &&
      !einp.value &&
      !telinp.value
    ) {
      alert("Xanalar boş buraxıla bilməz");
      // updateStepDisplay();
    } else {
      alert("Müraciətiniz qəbul edildi");
    }
  }

  if (currentStepIndex >= 3) {
    const dateV = document.querySelector(".noPalit");
    console.log(dateV.value);
    generalData.date = dateV.value;
    generalData.time = "09:00";

    let staffName = staff.find((a) => a.id == generalData.staff_id);
    let serviceName = services.find((a) => a.id == generalData.service_id);
    console.log(staffName);
    noteStaff.textContent = staffName.name;
    noteService.textContent = serviceName.name;
    notePrice.textContent = " $" + generalData.price;
    noteDate.textContent = `${generalData.date}/${generalData.time}`;
  }

  console.log(generalData);
});

backBtn.addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    updateStepDisplay();
  }
});

updateStepDisplay();
