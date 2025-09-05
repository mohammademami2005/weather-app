import './style.css'

let cityName = "marand"

fetch(`https://api.weatherapi.com/v1/forecast.json?key=bc3ec03583794c0f9a4150719250409&q=${cityName}&days=4`)
  .then(res => {
    if (!res.ok) {
      throw new Error("اطلاعات دریافت نشد")
    }
    return res.json()
  })
  .then((data) => {
    console.log(data)
    document.querySelector("#app").innerHTML = `
      <section class="w-[90%] md:w-[70%] lg:w-[50%] h-11/12 rounded-3xl px-6 py-4 bg2 text-white flex flex-wrap justify-center  *:w-full">

        <div class="flex justify-between h-1/4 *:w-[49%] *:h-full  ">
          <div class="flex flex-col justify-between">
            <span>${data.location.localtime}</span>
            <div class="flex items-center justify-start gap-5">
              <img src=${data.current.condition.icon} alt=""  class="w-20 h-20 object-cover">
              <span class="text-3xl font-bold">${data.current.temp_c}°C</span>
            </div>
            <p class="font-bold text-3xl">${data.location.name}, ${data.location.country}</p>
          </div>
          <div class="text-9xl">☁️</div>
        </div>


        <div class=" h-1/6  flex justify-around items-center rounded-3xl bg-[rgba(0,0,0,0.2)]">
          <div>
            <span class="text-2xl">☀️</span>
            <span>${data.forecast.forecastday[0].astro.sunrise}</span>
          </div>
          <p>11h 42m</p>
          <div>
            <span class="text-2xl">🌙</span>
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
          
          <div id="app2" class="flex justify-evenly items-center  *:flex *:flex-col *:justify-center  *:w-1/5 h-full *:h-9/12 *:rounded-2xl *:gap-2 *:text-center "></div>
        </div>
      </section>
`
    let mm = `
            <div class="cardbg"><span>today</span><span>⛅</span><span>8°</span><span>2°</span></div>
            <div class="cardbg"><span>fri</span><span>🌥️</span><span>9°</span><span>1°</span></div>
            <div class="cardbg"><span>su</span><span>☀️</span><span>9°</span><span>2°</span></div>
            <div class="cardbg"><span>so</span><span>🌙</span><span>9°</span><span>2°</span></div>
`
data.forecast.forecastday.forEach(item => {
  let div = document.createElement("div");
  div.classList.add("cardbg");
  console.log(item);
  
  div.appendChild(crateElement(item)); // الان درست کار میکنه
  document.querySelector("#app2").appendChild(div); // بچسبون به جای درست
});


  })
  .catch((error) => console.log(error))


function crateElement(item) {
  const colection = document.createDocumentFragment();

  const elementsData = [
    { type: "span", content: "today" },
    { type: "img", src: item.day.condition.icon ,class:"w-15 h-15"},
    { type: "span", content: item.day.maxtemp_c },
    { type: "span", content: item.day.mintemp_c },
  ];

  elementsData.forEach((el) => {
    const element = document.createElement(el.type);

    if (el.type === "img") {
      element.src = el.src;
      element.alt = "weather icon";
       element.classList.add(...el.class.split(" "));
    } else {
      element.textContent = el.content; // ✅ درست شد
    }

    colection.appendChild(element);
  });

  return colection; // ✅ مهم: حتماً fragment رو برگردون
}
