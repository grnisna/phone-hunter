/**
 *  Get all Phone from API
 * */
const getPhones = async (getFieldValue, isShowMore) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${getFieldValue}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowMore);
};

const displayPhone = (phones, isShowMore) => {
  const showMoreButton = document.getElementById("show-more");

  if (phones.length > 10 && !isShowMore) {
    showMoreButton.classList.remove("hidden");
  } else {
    showMoreButton.classList.add("hidden");
  }

  if (!isShowMore) {
    phones = phones.slice(0, 10);
  }

  const getPhoneContainer = document.getElementById("phones-container");
  getPhoneContainer.innerHTML = "";

  phones.forEach((phone) => {
    const newDiv = document.createElement("div");
    newDiv.classList = `card w-96 bg-base-100 shadow-xl`;
    newDiv.innerHTML = `
            <figure>
            <img
              src='${phone.image}'
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
              <button onclick="showDetails('${phone.slug}')" class="btn btn-success">show details</button>
            </div>
          </div>
            `;
    getPhoneContainer.appendChild(newDiv);
  });

  // stop loading spinner
  toggleLoading(false);
};

const hadleSearch = (isShowMore) => {
  const getFieldValue = document.getElementById("searchField").value;

  getPhones(getFieldValue, isShowMore);
};

const toggleLoading = (isLoading) => {
  const getLoadingDiv = document.getElementById("loading-div");
  if (isLoading) {
    getLoadingDiv.classList.remove("hidden");
  } else {
    getLoadingDiv.classList.add("hidden");
  }
};

const showMoreBtn = () => {
  hadleSearch(true);
};

const showDetails = async (slug) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  showPhoneDetails(phoneDetails);
};

const showPhoneDetails = (phoneDetails) => {
  const getModalDiv = document.getElementById("modal-div");
  getModalDiv.innerHTML = `
  <figure> <img class='mx-auto' src='${phoneDetails.image}' alt="phone image"/> </figure>
  <h3 class='font-bold my-5 '>Brand name: ${phoneDetails.brand} </h3>
  <h3 class='font-bold my-5 '>Model name: ${phoneDetails.name} </h3>
  
  <p class = 'font-bold my-3' > Storage :  ${phoneDetails.mainFeatures.storage} </p>
  <p class = 'font-bold my-3' > Display:  ${phoneDetails.mainFeatures.displaySize} </p>
  <p class = 'font-bold my-3' > Chip-Set:  ${phoneDetails.mainFeatures.chipSet} </p>
  <p class = 'font-bold my-3' > Memory:  ${phoneDetails.mainFeatures.memory} </p>
  <h3 class='font-bold my-5 '>Release Date: ${phoneDetails.releaseDate} </h3>
  <h3 class='font-bold my-5 '>GPS : ${phoneDetails?.others?.GPS} </h3>
  <h3 class='font-bold my-5 '>WLAN : ${phoneDetails?.others?.WLAN} </h3>




  <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn btn-success">Close</button>
   </form>
  `;

  show_phone_details.showModal();
};
// getPhones();
