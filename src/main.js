import './style.css'

const getCityNameSection = document.querySelector("#getCityName");
const cityIcon = document.querySelector("#cityIcon")
const gcnBtn = document.querySelector("#postCityname")
const inp = document.querySelector("#inp")
const errorLabel = document.querySelector("#error")
let cityName = JSON.parse(localStorage.getItem("city")) ? JSON.parse(localStorage.getItem("city")) : "paris";
getCityName();

function crateElement(item) {
  const colection = document.createDocumentFragment();

  const elementsData = [
    { type: "span", content: getDayName(item) },
    { type: "img", src: item.day.condition.icon, class: "w-full h-10 object-contain" },
    { type: "span", content: item.day.maxtemp_c },
    { type: "span", content: item.day.mintemp_c, class: "text-gray-300" },
  ];

  elementsData.forEach((el) => {
    const element = document.createElement(el.type);

    if (el.type === "img") {
      element.src = el.src;
      element.alt = "weather icon";
      element.classList.add(...el.class.split(" "));
    } else {
      element.textContent = el.content;
      element.classList.add(el.class)
    }

    colection.appendChild(element);
  });

  return colection;
}

function getDayName(item) {
  let thisDay = new Date(item.date)
  return thisDay.toLocaleDateString("en-US", { weekday: 'long' })
}

function getCityName() {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=bc3ec03583794c0f9a4150719250409&q=${cityName}&days=4`)
    .then(res => {
      if (!res.ok) {
        throw new Error("اطلاعات دریافت نشد")
      }
      return res.json()
    })
    .then((data) => {
      let x = data.forecast.forecastday[0]
      document.querySelector("#app").innerHTML = `
      <section class="w-[90%] md:w-[70%] lg:w-[50%] h-11/12 relative rounded-3xl px-6 py-4 bg2 text-white flex flex-wrap justify-center  *:w-full">

        <div class="flex justify-between h-1/4 *:w-[49%] *:h-full  ">
          <div class="flex flex-col justify-between">
            <span><span class="font-bold">${getDayName(x)}</span> ${data.location.localtime}</span>
            <div class="flex items-center justify-start sm:gap-2 md:gap-5 ">
              <img src=${data.current.condition.icon} alt=""  class="w-20 h-20 object-cover">
              <span class="text-3xl font-bold">${data.current.temp_c}°C</span>
            </div>
            <p class="font-bold text-3xl">${data.location.name}, ${data.location.country}</p>
          </div>
          <div class="text-9xl  flex justify-center items-center">☁️</div>
        </div>


        <div class=" h-1/6  flex justify-around items-center rounded-3xl bg-[rgba(0,0,0,0.2)]">
          <div>
            <span class="text-2xl">☀️</span>
            <span>${data.forecast.forecastday[0].astro.sunrise}</span>
          </div>
          <div>
            <span class="text-2xl ">🌙</span>
            <span>${data.forecast.forecastday[0].astro.sunset}</span>
          </div>
        </div>


        <div class="rounded-2xl h-[10%] bg-[rgba(253,253,253,0.24)] flex justify-start items-center ">
          <img src=${data.current.condition.icon} alt="" class="w-20 h-20 object-cover">
          <span class="text-xl">${data.current.condition.text} </span>
        </div>


        <div class=" h-1/3 p-[2%] rounded-3xl">
          <div class="flex justify-between items-center h-1/12 ">
            <span>Humidity: ${data.current.humidity}%</span>
            <span>Wind: ${data.current.wind_kph} km/h </span>
          </div>
          
          <div id="app2" class="flex justify-evenly items-center  *:flex *:flex-col *:justify-center  *:w-1/5 h-full *:h-11/12 *:rounded-2xl *:gap-2 *:text-center "></div>
        </div>
      </section>

`
      data.forecast.forecastday.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("cardbg");
        console.log(item);

        div.appendChild(crateElement(item));
        document.querySelector("#app2").appendChild(div);
      });
    })
    .catch((error) => console.log(error))
}


cityIcon.addEventListener("click", () => {
  getCityNameSection.classList.replace("hidden", "flex")
})

gcnBtn.addEventListener("click", () => {
  let newCity = inp.value
  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(newCity)) {
    errorLabel.innerHTML = 'please inter your valid city name !'
    errorLabel.classList.add("text-red-500", 'text-lg')
  } else {
    getCityNameSection.classList.replace("flex", "hidden")
    console.log(newCity)
    localStorage.setItem("city", JSON.stringify(newCity));
    cityName = newCity;
    getCityName()
  }
})