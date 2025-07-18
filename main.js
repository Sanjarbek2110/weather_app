const weatherForm = document.querySelector("#form");
const weatherInput = document.querySelector("#input");
const weatherWrapper = document.querySelector("#nmadur");
const submitBtn = document.querySelector("#btn");

const APIKey = "b666b91108e7369b3bb59839a6d3c134";

async function renderCity(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      weatherWrapper.innerHTML = `
        <p class="text-red-600 text-center text-[30px]">Shahar topilmadi!</p>
      `;
      return;
    }


const tempC = Math.round(data.main.temp - 273.15);
const tempMin = Math.round(data.main.temp_min - 273.15);
const tempMax = Math.round(data.main.temp_max - 273.15);



    weatherWrapper.innerHTML = `
      <div class="top flex flex-col gap-3 items-center text-center">
        <h1 class="text-[34px] text-[#FFFFFF]">${data.name}</h1>
        <h3 class="text-[94px] text-[#FFFFFF] font-extralight leading-[70px]">${tempC}°</h3>
        <div class="flex flex-col items-center gap-1">
          <h3 class="text-[#EBEBF599] text-[20px] font-semibold capitalize">${data.weather[0].description}</h3>
          <div class="flex gap-5 text-[20px] font-semibold text-[#FFF]">
            <p>H: ${tempMax}°</p>
            <p>L: ${tempMin}°</p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Xatolik:", error);
    weatherWrapper.innerHTML = `<p class="text-white">Ma'lumotni yuklashda xatolik yuz berdi.</p>`;
  }
}

weatherForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputValue = weatherInput.value.toLowerCase().trim();

  if (!inputValue) {
    weatherWrapper.innerHTML = `
      <p class="text-white mx-auto text-[20px]">Iltimos, shahar nomini kiriting</p>
    `;
    return;
  }

  renderCity(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKey}`);
});
