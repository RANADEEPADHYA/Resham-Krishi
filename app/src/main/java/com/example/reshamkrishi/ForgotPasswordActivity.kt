package com.example.reshamkrishi

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import android.view.View

class ForgotPasswordActivity :
    AppCompatActivity() {

    private lateinit var btnBack: LinearLayout
    private lateinit var etEmail: EditText
    private lateinit var btnSendResetLink: Button
    private lateinit var txtSignIn: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(
            R.layout.activity_forgot_password
        )

        initViews()

        setupListeners()
    }

    private fun initViews() {

        btnBack = findViewById(R.id.btnBack)
        etEmail = findViewById(R.id.etEmail)
        btnSendResetLink = findViewById(R.id.btnSendResetLink)
        txtSignIn = findViewById(R.id.txtSignIn)
    }

    private fun setupListeners() {

        // Back Button
        btnBack.setOnClickListener {
            animateButton(it)
            finish()
        }

        // Sign In Text
        txtSignIn.setOnClickListener {
            animateButton(it)
            finish()
        }

        // Send Reset Link Button
        btnSendResetLink.setOnClickListener {
            animateButton(it)

            val email =
                etEmail.text.toString().trim()

            // Empty Email
            if (email.isEmpty()) {

                etEmail.error =
                    "Enter Email Address"

                etEmail.requestFocus()

                return@setOnClickListener
            }

            // Invalid Email
            if (!Patterns.EMAIL_ADDRESS
                    .matcher(email)
                    .matches()
            ) {

                etEmail.error =
                    "Enter Valid Email"

                etEmail.requestFocus()

                return@setOnClickListener
            }

            Toast.makeText(
                this,
                "Reset Link Sent Successfully",
                Toast.LENGTH_LONG
            ).show()

            startActivity(
                Intent(
                    this,
                    CheckEmailActivity::class.java
                )
            )
        }
    }
    private fun animateButton(view: View) {

        view.animate()
            .scaleX(0.96f)
            .scaleY(0.96f)
            .setDuration(80)
            .withEndAction {

                view.animate()
                    .scaleX(1f)
                    .scaleY(1f)
                    .setDuration(80)
                    .start()
            }
            .start()
    }
}