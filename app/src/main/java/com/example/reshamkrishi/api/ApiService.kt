package com.example.reshamkrishi.api

import okhttp3.MultipartBody

import retrofit2.Call

import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiService {

    // ================= SILKWORM =================

    @Multipart
    @POST("/api/predict/silkworm")

    fun predictSilkworm(

        @Part file: MultipartBody.Part

    ): Call<PredictionResponse>

    // ================= LEAF =================

    @Multipart
    @POST("/api/predict/leaf")

    fun predictLeaf(

        @Part file: MultipartBody.Part

    ): Call<PredictionResponse>
}