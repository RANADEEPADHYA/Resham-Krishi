package com.example.reshamkrishi

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class PasswordResetSuccessActivity :
    AppCompatActivity() {

    private lateinit var btnGoToSignIn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(
            R.layout.activity_password_reset_success
        )

        initViews()
        setupListeners()
    }

    private fun initViews() {

        btnGoToSignIn = findViewById(R.id.btnGoToSignIn)
    }

    private fun setupListeners() {
        btnGoToSignIn.setOnClickListener {
            startActivity(
                Intent(
                    this,
                    SignInActivity::class.java
                )
            )
            finish()
        }
    }
}