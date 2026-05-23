package com.example.reshamkrishi

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class ResetPasswordActivity :
    AppCompatActivity() {
    private lateinit var btnBack: LinearLayout
    private lateinit var etPassword: EditText
    private lateinit var etConfirmPassword: EditText
    private lateinit var imgEye: ImageView
    private lateinit var imgEyeConfirm: ImageView
    private lateinit var btnResetPassword: Button
    private var isPasswordVisible = false
    private var isConfirmPasswordVisible = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(
            R.layout.activity_reset_password
        )

        initViews()

        setupListeners()
    }

    private fun initViews() {

        btnBack = findViewById(R.id.btnBack)

        etPassword = findViewById(R.id.etPassword)

        etConfirmPassword = findViewById(R.id.etConfirmPassword)

        imgEye = findViewById(R.id.imgEye)

        imgEyeConfirm = findViewById(R.id.imgEye_confirm)

        btnResetPassword = findViewById(R.id.btnResetPassword)
    }

    private fun setupListeners() {

        // Back Button
        btnBack.setOnClickListener {

            finish()
        }

        // Password Eye
        imgEye.setOnClickListener {

            togglePasswordVisibility()
        }

        // Confirm Password Eye
        imgEyeConfirm.setOnClickListener {

            toggleConfirmPasswordVisibility()
        }

        // Reset Password Button
        btnResetPassword.setOnClickListener {

            val password = etPassword.text.toString().trim()
            val confirmPassword = etConfirmPassword.text.toString().trim()

            // Empty Password
            if (password.isEmpty()) {
                etPassword.error =
                    "Enter Password"
                etPassword.requestFocus()
                return@setOnClickListener
            }

            // Password Length
            if (password.length < 6) {
                etPassword.error =
                    "Password must be at least 6 characters"
                etPassword.requestFocus()
                return@setOnClickListener
            }

            // Empty Confirm Password
            if (confirmPassword.isEmpty()) {
                etPassword.error =
                    "Enter Password"
                etPassword.requestFocus()
                return@setOnClickListener
            }

            // Empty Confirm Password
            if (confirmPassword.isEmpty()) {
                etConfirmPassword.error =
                    "Confirm Your Password"
                etConfirmPassword.requestFocus()
                return@setOnClickListener
            }

            // Password Match
            if (password != confirmPassword) {
                etConfirmPassword.error =
                    "Passwords do not match"
                etConfirmPassword.requestFocus()
                return@setOnClickListener
            }

            Toast.makeText(
                this,
                "Password Reset Successfully",
                Toast.LENGTH_LONG
            ).show()

            val intent = Intent(
                this,
                PasswordResetSuccessActivity::class.java
            )

            intent.flags =
                Intent.FLAG_ACTIVITY_NEW_TASK or
                        Intent.FLAG_ACTIVITY_CLEAR_TASK

            startActivity(intent)

            finish()
        }
    }

    // Toggle Password Visibility
    private fun togglePasswordVisibility() {

        isPasswordVisible =
            !isPasswordVisible

        if (isPasswordVisible) {

            etPassword.inputType =
                InputType.TYPE_CLASS_TEXT or
                        InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD

            imgEye.setImageResource(
                R.drawable.ic_eye_open
            )

        } else {

            etPassword.inputType =
                InputType.TYPE_CLASS_TEXT or
                        InputType.TYPE_TEXT_VARIATION_PASSWORD

            imgEye.setImageResource(
                R.drawable.ic_eye_closed
            )
        }

        etPassword.setSelection(
            etPassword.text.length
        )
    }

    // Toggle Confirm Password Visibility
    private fun toggleConfirmPasswordVisibility() {

        isConfirmPasswordVisible =
            !isConfirmPasswordVisible

        if (isConfirmPasswordVisible) {

            etConfirmPassword.inputType =
                InputType.TYPE_CLASS_TEXT or
                        InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD

            imgEyeConfirm.setImageResource(
                R.drawable.ic_eye_open
            )

        } else {

            etConfirmPassword.inputType =
                InputType.TYPE_CLASS_TEXT or
                        InputType.TYPE_TEXT_VARIATION_PASSWORD

            imgEyeConfirm.setImageResource(
                R.drawable.ic_eye_closed
            )
        }

        etConfirmPassword.setSelection(
            etConfirmPassword.text.length
        )
    }
}