@file:Suppress("DEPRECATION")

package com.example.reshamkrishi

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider
import android.net.ConnectivityManager
import android.net.NetworkCapabilities

class SignInActivity : AppCompatActivity() {

    // Firebase
    private lateinit var auth: FirebaseAuth
    private lateinit var googleSignInClient: GoogleSignInClient

    // Views
    private lateinit var etEmail: EditText
    private lateinit var etPassword: EditText

    private lateinit var imgEye: ImageView

    private lateinit var btnSignIn: Button
    private lateinit var btnGoogle: LinearLayout

    private lateinit var txtForgot: TextView
    private lateinit var txtSignUp: TextView

    private lateinit var btnSignInPage: LinearLayout
    private lateinit var btnSignUpPage: LinearLayout

    // Password Visibility
    private var isPasswordVisible = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)

        // Internet Check Code
        val connectivityManager =
            getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager

        val network = connectivityManager.activeNetwork
        val capabilities = connectivityManager.getNetworkCapabilities(network)

        if (capabilities != null) {
            Toast.makeText(this, "Internet Connected", Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(this, "No Internet", Toast.LENGTH_SHORT).show()
        }

        etEmail = findViewById(R.id.etEmail)

        etPassword = findViewById(R.id.etPassword)

        imgEye = findViewById(R.id.imgEye)

        btnSignIn = findViewById(R.id.btnSignIn)

        btnGoogle = findViewById(R.id.btnGoogle)

        txtForgot = findViewById(R.id.txtForgot)

        txtSignUp = findViewById(R.id.txtSignUp)

        btnSignInPage = findViewById(R.id.btnSignInPage)

        btnSignUpPage = findViewById(R.id.btnSignUpPage)

        // Firebase Auth
        auth = FirebaseAuth.getInstance()

        // CHECK USER ALREADY LOGGED IN
        if (auth.currentUser != null) {

            startActivity(
                Intent(
                    this,
                    MainActivity::class.java
                )
            )

            finish()
            return
        }

        // Google Sign In Config
        val gso = GoogleSignInOptions.Builder(
            GoogleSignInOptions.DEFAULT_SIGN_IN
        )
            .requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        // EMAIL PASSWORD LOGIN
        btnSignIn.setOnClickListener {

            animateButton(it)

            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()

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

            auth.signInWithEmailAndPassword(
                email,
                password
            ).addOnCompleteListener { task ->

                if (task.isSuccessful) {

                    Toast.makeText(
                        this,
                        "Login Successful",
                        Toast.LENGTH_SHORT
                    ).show()

                    val intent =
                        Intent(
                            this,
                            MainActivity::class.java
                        )

                    startActivity(intent)

                    finish()

                } else {

                    Toast.makeText(
                        this,
                        task.exception?.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        }

        // GOOGLE SIGN IN
        btnGoogle.setOnClickListener {
            animateButton(it)
            val signInIntent = googleSignInClient.signInIntent
            launcher.launch(signInIntent)
        }

        // SIGN UP PAGE
        txtSignUp.setOnClickListener {
            animateButton(txtSignUp)
            startActivity(
                Intent(
                    this,
                    SignUpActivity::class.java
                )
            )
            finish()
        }

        // FORGOT PASSWORD PAGE
        txtForgot.setOnClickListener {
            animateButton(txtForgot)
            startActivity(
                Intent(
                    this,
                    ForgotPasswordActivity::class.java
                )
            )
        }

        // Password Toggle
        imgEye.setOnClickListener {

            togglePasswordVisibility()
        }

        // Bottom Navigation Buttons
        btnSignInPage.setOnClickListener {

            animateButton(it)
        }

        btnSignUpPage.setOnClickListener {

            animateButton(it)

            startActivity(Intent(this, SignUpActivity::class.java))
            finish()
        }
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

        // Cursor stays at end
        etPassword.setSelection(etPassword.text.length)
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
}