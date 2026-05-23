package com.example.reshamkrishi.api

import com.example.reshamkrishi.WeatherResponse
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

interface WeatherApi {

    // ================= CURRENT WEATHER =================

    @GET("weather")
    fun getWeather(

        @Query("q") city: String,

        @Query("appid") apiKey: String,

        @Query("units") units: String = "metric"

    ): Call<WeatherResponse>

    // ================= 7 DAY FORECAST =================

    @GET("forecast")
    fun getForecast(

        @Query("q") city: String,

        @Query("appid") apiKey: String,

        @Query("units") units: String = "metric"

    ): Call<ForecastResponse>
}