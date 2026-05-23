@file:Suppress("DEPRECATION")

package com.example.reshamkrishi

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.firebase.auth.GoogleAuthProvider
import androidx.activity.result.contract.ActivityResultContracts
import com.google.firebase.auth.FirebaseAuth

class SignUpActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth
    private lateinit var googleSignInClient: GoogleSignInClient

    // Views
    private lateinit var etFullName: EditText
    private lateinit var etPhone: EditText
    private lateinit var etEmail: EditText
    private lateinit var etPassword: EditText
    private lateinit var etConfirmPassword: EditText

    private lateinit var imgEye: ImageView
    private lateinit var imgEyeConfirm: ImageView

    private lateinit var btnSignIn: Button
    private lateinit var btnGoogle: LinearLayout

    private lateinit var txtSignUp: TextView

    private lateinit var btnSignInPage: LinearLayout
    private lateinit var btnSignUpPage: LinearLayout

    // Password Visibility States
    private var isPasswordVisible = false
    private var isConfirmPasswordVisible = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_up)

        auth = FirebaseAuth.getInstance()

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN
        )
            .requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        initViews()
        setupClickListeners()
    }

    // Initialize Views
    private fun initViews() {

        etFullName = findViewById(R.id.etFullName)
        etPhone = findViewById(R.id.etPhone)
        etEmail = findViewById(R.id.etEmail)
        etPassword = findViewById(R.id.etPassword)
        etConfirmPassword = findViewById(R.id.etConfirmPassword)

        imgEye = findViewById(R.id.imgEye)
        imgEyeConfirm = findViewById(R.id.imgEye_confirm)

        btnSignIn = findViewById(R.id.btnSignIn)
        btnGoogle = findViewById(R.id.btnGoogle)

        txtSignUp = findViewById(R.id.txtSignUp)

        btnSignInPage = findViewById(R.id.btnSignInPage)
        btnSignUpPage = findViewById(R.id.btnSignUpPage)
    }

    // Click Listeners
    private fun setupClickListeners() {

        // Create Account Button
        btnSignIn.setOnClickListener {

            animateButton(it)

            val fullName = etFullName.text.toString().trim()
            val phone = etPhone.text.toString().trim()
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()
            val confirmPassword = etConfirmPassword.text.toString().trim()

            // Full Name
            if (fullName.isEmpty()) {

                etFullName.error = "Enter Full Name"
                etFullName.requestFocus()
                return@setOnClickListener
            }

            // Phone
            if (phone.isEmpty()) {

                etPhone.error = "Enter Phone Number"
                etPhone.requestFocus()
                return@setOnClickListener
            }

            if (phone.length != 10) {

                etPhone.error = "Enter Valid Phone Number"
                etPhone.requestFocus()
                return@setOnClickListener
            }

            // Email
            if (email.isEmpty()) {

                etEmail.error = "Enter Email"
                etEmail.requestFocus()
                return@setOnClickListener
            }

            if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {

                etEmail.error = "Enter Valid Email"
                etEmail.requestFocus()
                return@setOnClickListener
            }

            // Password
            if (password.isEmpty()) {

                etPassword.error = "Enter Password"
                etPassword.requestFocus()
                return@setOnClickListener
            }

            if (password.length < 6) {

                etPassword.error = "Password must be at least 6 characters"
                etPassword.requestFocus()
                return@setOnClickListener
            }

            // Confirm Password
            if (confirmPassword.isEmpty()) {

                etConfirmPassword.error = "Confirm Your Password"
                etConfirmPassword.requestFocus()
                return@setOnClickListener
            }

            if (password != confirmPassword) {

                etConfirmPassword.error = "Passwords do not match"
                etConfirmPassword.requestFocus()
                return@setOnClickListener
            }

            auth.createUserWithEmailAndPassword(
                email,
                password
            ).addOnCompleteListener { task ->

                if (task.isSuccessful) {

                    // Save User Data
                    val sharedPref =
                        getSharedPreferences(
                            "UserData",
                            MODE_PRIVATE
                        )

                    sharedPref.edit()
                        .putString(
                            "user_name",
                            fullName
                        )
                        .putString(
                            "user_email",
                            email
                        )
                        .putString(
                            "user_phone",
                            phone
                        )
                        .apply()

                    Toast.makeText(
                        this,
                        "Account Created Successfully",
                        Toast.LENGTH_SHORT
                    ).show()

                    startActivity(
                        Intent(
                            this,
                            MainActivity::class.java
                        )
                    )

                    finish()
                }else {

                    Toast.makeText(
                        this,
                        "Error: ${task.exception}",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        }

        // Google Button
        btnGoogle.setOnClickListener {

            animateButton(btnGoogle)

            val signInIntent =
                googleSignInClient.signInIntent

            launcher.launch(signInIntent)
        }

        // Open Sign In
        txtSignUp.setOnClickListener {

            animateButton(it)

            startActivity(Intent(this, SignInActivity::class.java))
            finish()
        }

        // Password Toggle
        imgEye.setOnClickListener {

            togglePasswordVisibility()
        }

        // Confirm Password Toggle
        imgEyeConfirm.setOnClickListener {

            toggleConfirmPasswordVisibility()
        }

        // Bottom Buttons
        btnSignInPage.setOnClickListener {

            animateButton(it)
            startActivity(Intent(this, SignInActivity::class.java))
            finish()
        }

        btnSignUpPage.setOnClickListener {

            animateButton(it)
        }
    }

    // Toggle Password Visibility
    private fun togglePasswordVisibility() {

        isPasswordVisible = !isPasswordVisible

        if (isPasswordVisible) {

            etPassword.inputType =
                InputType.TYPE_CLASS_TEXT or
                        InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD

            imgEye.setImageResource(R.drawable.ic_eye_open)

        } else {

            etPassword.inputType =
                InputType.TYPE_CLASS_TEXT or
                        InputType.TYPE_TEXT_VARIATION_PASSWORD

            imgEye.setImageResource(R.drawable.ic_eye_closed)
        }

        etPassword.setSelection(etPassword.text.length)
    }

    // Toggle Confirm Password Visibility
    private fun toggleConfirmPasswordVisibility() {

        isConfirmPasswordVisible = !isConfirmPasswordVisible

        if (isConfirmPasswordVisible) {

            etConfirmPassword.inputType =
                InputType.TYPE_CLASS_TEXT or
                        InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD

            imgEyeConfirm.setImageResource(R.drawable.ic_eye_open)

        } else {

            etConfirmPassword.inputType =
                InputType.TYPE_CLASS_TEXT or
                        InputType.TYPE_TEXT_VARIATION_PASSWORD

            imgEyeConfirm.setImageResource(R.drawable.ic_eye_closed)
        }

        etConfirmPassword.setSelection(etConfirmPassword.text.length)
    }

    // Button Animation
    private fun animateButton(view: android.view.View) {

        view.animate()
            .scaleX(0.95f)
            .scaleY(0.95f)
            .setDuration(100)
            .withEndAction {

                view.animate()
                    .scaleX(1f)
                    .scaleY(1f)
                    .setDuration(100)
                    .start()
            }
            .start()
    }

    // GOOGLE RESULT
    private val launcher =
        registerForActivityResult(
            ActivityResultContracts.StartActivityForResult()
        ) { result ->

        val task = GoogleSignIn
            .getSignedInAccountFromIntent(result.data)

        try {

            val account = task.result

            val credential =
                GoogleAuthProvider.getCredential(
                    account.idToken,
                    null
                )

            auth.signInWithCredential(credential)
                .addOnCompleteListener { authTask ->

                    if (authTask.isSuccessful) {

                        Toast.makeText(
                            this,
                            "Google Sign In Successful",
                            Toast.LENGTH_SHORT
                        ).show()

                        startActivity(
                            Intent(
                                this,
                                MainActivity::class.java
                            )
                        )

                        finish()

                    } else {

                        Toast.makeText(
                            this,
                            "Error: ${authTask.exception?.message}",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }

        } catch (e: Exception) {

            Toast.makeText(
                this,
                "Google Sign In Failed: ${e.message}",
                Toast.LENGTH_LONG
            ).show()
        }
    }
}