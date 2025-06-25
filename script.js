<script>
  class WeatherFetcher {
    constructor(apiKey) {
      this.apiKey = apiKey;
    }

    formatTime(unixTime) {
      return new Date(unixTime * 1000).toLocaleTimeString();
    }

    async fetchWeather(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) {
        alert("City not found. Please try again.");
        throw new Error("City not found");
      }

      const data = await res.json();

      // Update main weather section
      document.querySelector("h1.text-center").textContent = `Weather for ${city}`;
      document.getElementById("tem").textContent = data.main.temp + "°C";
      document.getElementById("tem2").textContent = data.main.temp + "°C";
      document.getElementById("min_tem").textContent = data.main.temp_min + "°C";
      document.getElementById("max_tem").textContent = data.main.temp_max + "°C";
      document.getElementById("feels_like").textContent = data.main.feels_like + "°C";
      document.getElementById("humidity").textContent = data.main.humidity + "%";
      document.getElementById("humidity2").textContent = data.main.humidity + "%";
      document.getElementById("wind_speed").textContent = data.wind.speed + " m/s";
      document.getElementById("wind_Degrees").textContent = data.wind.deg + "°";
      document.getElementById("wind_speed2").textContent = data.wind.speed + " m/s";
      document.getElementById("sunrise").textContent = this.formatTime(data.sys.sunrise);
      document.getElementById("sunset").textContent = this.formatTime(data.sys.sunset);
    }

    async updateTable() {
      const rows = document.querySelectorAll("#weatherTableBody tr");
      for (const row of rows) {
        const city = row.dataset.city;
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
          const res = await fetch(url);
          const data = await res.json();
          row.innerHTML = `
            <th class="text-start">${city}</th>
            <td>${data.main.feels_like}°C</td>
            <td>${data.main.humidity}%</td>
            <td>${data.main.temp_max}°C</td>
            <td>${data.main.temp_min}°C</td>
            <td>${this.formatTime(data.sys.sunrise)}</td>
            <td>${this.formatTime(data.sys.sunset)}</td>
            <td>${data.main.temp}°C</td>
            <td>${data.wind.deg}°</td>
            <td>${data.wind.speed} m/s</td>
          `;
        } catch (err) {
          row.innerHTML = `<th class="text-start">${city}</th><td colspan="9">Error loading data</td>`;
        }
      }
    }
  }

  window.onload = function () {
    const app = new WeatherFetcher("6f9a9206b2918b327d1424f415c32fc6");
    app.updateTable(); // Load initial cities

    // Handle form submission
    const form = document.getElementById("searchForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const city = document.getElementById("searchInput").value.trim();
      if (city !== "") {
        app.fetchWeather(city);
        document.getElementById("searchInput").value = ""; // Clear input
      }
    });
  };
</script>
