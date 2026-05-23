package com.example.reshamkrishi.api

import com.example.reshamkrishi.Main
import com.example.reshamkrishi.Weather

data class ForecastResponse(

    val list: List<ForecastItem>
)

data class ForecastItem(

    val dt_txt: String,

    val main: Main,

    val weather: List<Weather>
)