package com.example.reshamkrishi

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.camera2.CameraManager
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class ScanDiseaseActivity : AppCompatActivity() {

    private lateinit var layoutFlash: LinearLayout
    private lateinit var layoutGallery: LinearLayout
    private lateinit var btnCapture: android.widget.FrameLayout

    private var flashOn = false

    private lateinit var cameraManager: CameraManager
    private lateinit var cameraId: String
    private lateinit var btnBack: ImageView

    companion object {

        private const val CAMERA_REQUEST = 100
        private const val GALLERY_REQUEST = 101
        private const val CAMERA_PERMISSION = 102
    }

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)

        enableEdgeToEdge()

        setContentView(R.layout.activity_scan_leaf)

        // Views
        btnBack = findViewById(R.id.btnBack)
        layoutFlash = findViewById(R.id.layoutFlash)
        layoutGallery = findViewById(R.id.layoutGallery)
        btnCapture = findViewById(R.id.btnCapture)

        // Camera Flash

        cameraManager =
            getSystemService(CAMERA_SERVICE) as CameraManager

        cameraId = cameraManager.cameraIdList[0]

        // Flash Button

        layoutFlash.setOnClickListener {

            toggleFlash()
        }
        btnBack.setOnClickListener {

            finish()
        }

        // Camera Capture

        btnCapture.setOnClickListener {

            openCamera()
        }

        // Gallery

        layoutGallery.setOnClickListener {

            openGallery()
        }
    }

    // ================= FLASH =================

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

    // ================= CAMERA =================

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
                arrayOf(Manifest.permission.CAMERA),
                CAMERA_PERMISSION
            )
        }
    }

    // ================= GALLERY =================

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

    // ================= RESULT =================

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

        if (requestCode == GALLERY_REQUEST) {

            val imageUri: Uri? = data?.data

            Toast.makeText(
                this,
                "Gallery Image Selected",
                Toast.LENGTH_SHORT
            ).show()
        }

        if (requestCode == CAMERA_REQUEST) {

            Toast.makeText(
                this,
                "Photo Captured",
                Toast.LENGTH_SHORT
            ).show()
        }
    }
}