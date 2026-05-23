package com.example.reshamkrishi.api

data class PredictionResponse(

    val status: String,

    val disease: String,

    val confidence: Double,

    val diagnosis_summary: String,

    val symptoms: List<String>,

    val pdf_report: String
)