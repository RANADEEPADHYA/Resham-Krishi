package com.example.reshamkrishi

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import com.example.reshamkrishi.api.ForecastResponse
import com.example.reshamkrishi.api.WeatherApi
import retrofit2.*
import retrofit2.converter.gson.GsonConverterFactory

class ClimateInfoFragment : Fragment() {

    private lateinit var txtCity: TextView
    private lateinit var txtTemp: TextView
    private lateinit var txtWeather: TextView
    private lateinit var txtDescription: TextView
    private lateinit var txtWind: TextView
    private lateinit var txtHumidity: TextView
    private lateinit var txtPressure: TextView
    private lateinit var spinnerCity: Spinner
    private lateinit var forecastContainer: LinearLayout

    private val apiKey = "a8e31a912fac70458ac9a1ba8737bdc5"

    private val cityList = arrayOf(
        "Kolkata",
        "Delhi",
        "Mumbai",
        "Chennai",
        "Bangalore",
        "Hyderabad",
        "Pune",
        "Guwahati"
    )

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        val view = inflater.inflate(
            R.layout.fragment_climate_info,
            container,
            false
        )

        txtCity = view.findViewById(R.id.txtCity)
        txtTemp = view.findViewById(R.id.txtTemp)
        txtWeather = view.findViewById(R.id.txtWeather)
        txtDescription = view.findViewById(R.id.txtDescription)
        txtWind = view.findViewById(R.id.txtWind)
        txtHumidity = view.findViewById(R.id.txtHumidity)
        txtPressure = view.findViewById(R.id.txtPressure)
        spinnerCity = view.findViewById(R.id.spinnerCity)
        forecastContainer = view.findViewById(R.id.forecastContainer)

        setupSpinner()

        return view
    }

    private fun setupSpinner() {

        val adapter = ArrayAdapter(
            requireContext(),
            android.R.layout.simple_spinner_dropdown_item,
            cityList
        )

        spinnerCity.adapter = adapter

        spinnerCity.onItemSelectedListener =
            object : AdapterView.OnItemSelectedListener {

                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
                ) {

                    getWeatherData(cityList[position])
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {}
            }
    }

    private fun getWeatherData(city: String) {

        val retrofit = Retrofit.Builder()
            .baseUrl("https://api.openweathermap.org/data/2.5/")
            .addConverterFactory(
                GsonConverterFactory.create()
            )
            .build()

        val api = retrofit.create(WeatherApi::class.java)

        api.getWeather(
            city,
            apiKey,
            "metric"
        ).enqueue(object : Callback<WeatherResponse> {

            override fun onResponse(
                call: Call<WeatherResponse>,
                response: Response<WeatherResponse>
            ) {

                if (response.isSuccessful) {

                    val data = response.body()

                    txtCity.text = data?.name

// TEMPERATURE

                    txtTemp.text =
                        "${data?.main?.temp?.toInt()}°C"

// WEATHER

                    val weatherMain =
                        data?.weather?.get(0)?.main ?: ""

                    txtWeather.text = weatherMain

                    changeWeatherBackground(weatherMain)

                    txtWeather.text =
                        data?.weather?.get(0)?.main

                    txtDescription.text =
                        "Feels like ${data?.main?.feels_like?.toInt()}°C • ${
                            data?.weather?.get(0)?.description
                        }"

                    txtWind.text =
                        "${data?.wind?.speed} km/h"

                    txtHumidity.text =
                        "${data?.main?.humidity}%"

                    txtPressure.text =
                        "${data?.main?.pressure}"

                    loadForecast(city)
                }
            }

            override fun onFailure(
                call: Call<WeatherResponse>,
                t: Throwable
            ) {

                txtWeather.text = "Failed"
            }
        })
    }

    private fun loadForecast(city: String) {

        forecastContainer.removeAllViews()

        val retrofit = Retrofit.Builder()

            .baseUrl("https://api.openweathermap.org/data/2.5/")

            .addConverterFactory(
                GsonConverterFactory.create()
            )

            .build()

        val api = retrofit.create(
            WeatherApi::class.java
        )

        api.getForecast(

            city,

            apiKey,

            "metric"

        ).enqueue(object : Callback<ForecastResponse> {

            override fun onResponse(

                call: Call<ForecastResponse>,

                response: Response<ForecastResponse>
            ) {

                if (response.isSuccessful) {

                    val data = response.body()

                    val dailyForecasts =
                        data?.list
                            ?.filterIndexed { index, _ ->

                                index % 8 == 0
                            }
                            ?.take(7)

                    dailyForecasts?.forEach {

                        val card =
                            LinearLayout(requireContext())

                        card.orientation =
                            LinearLayout.VERTICAL

                        card.gravity =
                            android.view.Gravity.CENTER

                        card.setPadding(
                            30,
                            30,
                            30,
                            30
                        )

                        val params =
                            LinearLayout.LayoutParams(
                                320,
                                450
                            )

                        params.marginEnd = 25

                        card.layoutParams = params

                        val weatherMain =
                            it.weather[0].main

                        // BACKGROUND

                        when (weatherMain.lowercase()) {

                            "clear" -> {

                                card.setBackgroundResource(
                                    R.drawable.bg_sunny
                                )
                            }

                            "clouds" -> {

                                card.setBackgroundResource(
                                    R.drawable.bg_cloudy
                                )
                            }

                            "rain", "drizzle" -> {

                                card.setBackgroundResource(
                                    R.drawable.bg_rainy
                                )
                            }

                            "thunderstorm" -> {

                                card.setBackgroundResource(
                                    R.drawable.bg_stormy
                                )
                            }

                            "mist", "fog", "haze" -> {

                                card.setBackgroundResource(
                                    R.drawable.bg_foggy
                                )
                            }

                            else -> {

                                card.setBackgroundResource(
                                    R.drawable.bg_weather
                                )
                            }
                        }

                        // DAY

                        val dayText =
                            TextView(requireContext())

                        val date =
                            java.text.SimpleDateFormat(
                                "yyyy-MM-dd HH:mm:ss",
                                java.util.Locale.getDefault()
                            ).parse(it.dt_txt)

                        val dayName =
                            java.text.SimpleDateFormat(
                                "EEE",
                                java.util.Locale.getDefault()
                            ).format(date!!)

                        dayText.text = dayName

                        dayText.textSize = 18f

                        dayText.setTextColor(
                            resources.getColor(
                                android.R.color.white
                            )
                        )

                        dayText.setTypeface(
                            null,
                            android.graphics.Typeface.BOLD
                        )

                        // WEATHER

                        val weatherText =
                            TextView(requireContext())

                        weatherText.text =
                            weatherMain

                        weatherText.textSize = 16f

                        weatherText.setTextColor(
                            resources.getColor(
                                android.R.color.white
                            )
                        )

                        weatherText.setPadding(
                            0,
                            20,
                            0,
                            0
                        )

                        // TEMP

                        val tempText =
                            TextView(requireContext())

                        tempText.text =
                            "${it.main.temp.toInt()}°"

                        tempText.textSize = 32f

                        tempText.setTextColor(
                            resources.getColor(
                                android.R.color.white
                            )
                        )

                        tempText.setTypeface(
                            null,
                            android.graphics.Typeface.BOLD
                        )

                        tempText.setPadding(
                            0,
                            20,
                            0,
                            0
                        )

                        // ADD TO CARD

                        card.addView(dayText)

                        card.addView(weatherText)

                        card.addView(tempText)

                        // ADD TO CONTAINER

                        forecastContainer.addView(card)
                    }
                }
            }

            override fun onFailure(

                call: Call<ForecastResponse>,

                t: Throwable
            ) {

                Toast.makeText(

                    requireContext(),

                    "Forecast Failed",

                    Toast.LENGTH_SHORT

                ).show()
            }
        })
    }

    private fun changeWeatherBackground(weather: String) {

        val rootView = requireView()

        when (weather.lowercase()) {

            "sunny", "clear" -> {
                rootView.setBackgroundResource(R.drawable.bg_sunny)
            }

            "rainy", "rain", "drizzle" -> {
                rootView.setBackgroundResource(R.drawable.bg_rainy)
            }

            "cloudy", "clouds" -> {
                rootView.setBackgroundResource(R.drawable.bg_cloudy)
            }

            "humid" -> {
                rootView.setBackgroundResource(R.drawable.bg_humid)
            }

            "hot" -> {
                rootView.setBackgroundResource(R.drawable.bg_hot)
            }

            "cold", "snow" -> {
                rootView.setBackgroundResource(R.drawable.bg_cold)
            }

            "windy" -> {
                rootView.setBackgroundResource(R.drawable.bg_windy)
            }

            "stormy", "thunderstorm" -> {
                rootView.setBackgroundResource(R.drawable.bg_stormy)
            }

            "foggy", "mist", "haze" -> {
                rootView.setBackgroundResource(R.drawable.bg_foggy)
            }

            else -> {
                rootView.setBackgroundResource(R.drawable.bg_weather)
            }
        }
    }
}