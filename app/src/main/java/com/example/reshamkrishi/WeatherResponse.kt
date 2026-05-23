package com.example.reshamkrishi

data class WeatherResponse(

    val name: String,

    val weather: List<Weather>,

    val main: Main,

    val wind: Wind,

    val sys: Sys
)

data class Weather(

    val main: String,

    val description: String
)

data class Main(

    val temp: Double,

    val feels_like: Double,

    val humidity: Int,

    val pressure: Int
)

data class Wind(

    val speed: Double
)

data class Sys(

    val sunrise: Long,

    val sunset: Long
)