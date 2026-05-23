package com.example.reshamkrishi

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.camera2.CameraManager
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.Toast

import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope

import com.example.reshamkrishi.api.PredictionResponse
import com.example.reshamkrishi.api.FileUtils
import com.example.reshamkrishi.api.RetrofitClient

import kotlinx.coroutines.launch

import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody

class ScanDiseaseActivity : AppCompatActivity() {

    private lateinit var layoutFlash: LinearLayout
    private lateinit var layoutGallery: LinearLayout
    private lateinit var btnCapture: FrameLayout
    private lateinit var btnBack: ImageView

    private var flashOn = false

    private lateinit var cameraManager: CameraManager
    private lateinit var cameraId: String

    companion object {

        private const val CAMERA_REQUEST = 100

        private const val GALLERY_REQUEST = 101

        private const val CAMERA_PERMISSION = 102
    }

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)

        enableEdgeToEdge()

        setContentView(R.layout.activity_scan_leaf)

        // ================= VIEWS =================

        btnBack =
            findViewById(R.id.btnBack)

        layoutFlash =
            findViewById(R.id.layoutFlash)

        layoutGallery =
            findViewById(R.id.layoutGallery)

        btnCapture =
            findViewById(R.id.btnCapture)

        // ================= CAMERA =================

        cameraManager =
            getSystemService(CAMERA_SERVICE)
                    as CameraManager

        cameraId =
            cameraManager.cameraIdList[0]

        // ================= BACK =================

        btnBack.setOnClickListener {

            finish()
        }

        // ================= FLASH =================

        layoutFlash.setOnClickListener {

            toggleFlash()
        }

        // ================= CAMERA =================

        btnCapture.setOnClickListener {

            openCamera()
        }

        // ================= GALLERY =================

        layoutGallery.setOnClickListener {

            openGallery()
        }
    }

    // =====================================================
    // FLASH
    // =====================================================

    private fun toggleFlash() {

        try {

            flashOn = !flashOn

            cameraManager.setTorchMode(

                cameraId,

                flashOn
            )

        } catch (e: Exception) {

            Toast.makeText(

                this,

                "Flash not available",

                Toast.LENGTH_SHORT

            ).show()
        }
    }

    // =====================================================
    // CAMERA
    // =====================================================

    private fun openCamera() {

        if (

            ContextCompat.checkSelfPermission(

                this,

                Manifest.permission.CAMERA

            ) == PackageManager.PERMISSION_GRANTED
        ) {

            val intent = Intent(

                MediaStore.ACTION_IMAGE_CAPTURE
            )

            startActivityForResult(

                intent,

                CAMERA_REQUEST
            )

        } else {

            ActivityCompat.requestPermissions(

                this,

                arrayOf(
                    Manifest.permission.CAMERA
                ),

                CAMERA_PERMISSION
            )
        }
    }

    // =====================================================
    // GALLERY
    // =====================================================

    private fun openGallery() {

        val intent = Intent(

            Intent.ACTION_PICK,

            MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        )

        startActivityForResult(

            intent,

            GALLERY_REQUEST
        )
    }

    // =====================================================
    // UPLOAD TO BACKEND
    // =====================================================

    private fun uploadImageToBackend(

        imageUri: Uri
    ) {

        try {

            val file =

                FileUtils.uriToFile(

                    this@ScanDiseaseActivity,

                    imageUri
                )

            val requestFile =

                file.asRequestBody(

                    "image/*"
                        .toMediaTypeOrNull()
                )

            val body =

                MultipartBody.Part
                    .createFormData(

                        "file",

                        file.name,

                        requestFile
                    )

            // =========================================
            // API CALL
            // =========================================

            RetrofitClient.api
                .predictLeaf(body)

                .enqueue(object :
                    retrofit2.Callback<PredictionResponse> {

                    override fun onResponse(

                        call: retrofit2.Call<PredictionResponse>,

                        response: retrofit2.Response<PredictionResponse>
                    ) {

                        if (response.isSuccessful) {

                            val result =
                                response.body()

                            Toast.makeText(

                                this@ScanDiseaseActivity,

                                "Disease: ${result?.disease}\nConfidence: ${result?.confidence}%",

                                Toast.LENGTH_LONG

                            ).show()

                        } else {

                            Toast.makeText(

                                this@ScanDiseaseActivity,

                                "Prediction Failed",

                                Toast.LENGTH_LONG

                            ).show()
                        }
                    }

                    override fun onFailure(

                        call: retrofit2.Call<PredictionResponse>,

                        t: Throwable
                    ) {

                        Toast.makeText(

                            this@ScanDiseaseActivity,

                            t.message,

                            Toast.LENGTH_LONG

                        ).show()
                    }
                })

        } catch (e: Exception) {

            Toast.makeText(

                this,

                e.message,

                Toast.LENGTH_LONG

            ).show()
        }
    }
    // =====================================================
    // RESULT
    // =====================================================

    override fun onActivityResult(

        requestCode: Int,

        resultCode: Int,

        data: Intent?
    ) {

        super.onActivityResult(

            requestCode,

            resultCode,

            data
        )

        // ================= GALLERY =================

        if (

            requestCode == GALLERY_REQUEST &&

            resultCode == RESULT_OK
        ) {

            val imageUri: Uri? =
                data?.data

            imageUri?.let {

                uploadImageToBackend(it)
            }
        }

        // ================= CAMERA =================

        if (

            requestCode == CAMERA_REQUEST &&

            resultCode == RESULT_OK
        ) {

            Toast.makeText(

                this,

                "Camera image captured",

                Toast.LENGTH_SHORT

            ).show()

            // CameraX implementation later
        }
    }
}