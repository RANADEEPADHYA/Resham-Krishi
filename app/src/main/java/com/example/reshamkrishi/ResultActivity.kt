package com.example.reshamkrishi

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ResultActivity : AppCompatActivity() {

    private lateinit var btnBack: ImageView

    private lateinit var txtDisease: TextView
    private lateinit var txtConfidence: TextView
    private lateinit var txtSummary: TextView
    private lateinit var txtSymptoms: TextView
    private lateinit var txtStatus: TextView

    private lateinit var btnDownloadPdf: Button

    private var pdfUrl: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_result)

        // ================= VIEWS =================

        btnBack =
            findViewById(R.id.btnBack)

        txtDisease =
            findViewById(R.id.txtDisease)

        txtConfidence =
            findViewById(R.id.txtConfidence)

        txtSummary =
            findViewById(R.id.txtSummary)

        txtSymptoms =
            findViewById(R.id.txtSymptoms)

        txtStatus =
            findViewById(R.id.txtStatus)

        btnDownloadPdf =
            findViewById(R.id.btnDownloadPdf)

        // ================= GET DATA =================

        val disease =
            intent.getStringExtra("disease")

        val confidence =
            intent.getDoubleExtra(
                "confidence",
                0.0
            )

        val summary =
            intent.getStringExtra("summary")

        val symptoms =
            intent.getStringExtra("symptoms")

        val status =
            intent.getStringExtra("status")

        pdfUrl =
            intent.getStringExtra("pdf_report")
                ?: ""

        // ================= SET DATA =================

        txtDisease.text =
            disease

        txtConfidence.text =
            "Confidence: ${confidence}%"

        txtSummary.text =
            summary

        txtSymptoms.text =
            symptoms

        txtStatus.text =
            status

        // ================= PDF =================

        btnDownloadPdf.setOnClickListener {

            if (pdfUrl.isNotEmpty()) {

                val intent = Intent(

                    Intent.ACTION_VIEW,

                    Uri.parse(pdfUrl)
                )

                startActivity(intent)
            }
        }

        // ================= BACK =================

        btnBack.setOnClickListener {

            finish()
        }
    }
}