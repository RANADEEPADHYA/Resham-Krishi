package com.example.reshamkrishi

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.os.CountDownTimer
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import android.view.View
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class CheckEmailActivity :
    AppCompatActivity() {

    private lateinit var btnBack: LinearLayout
    private lateinit var btnOpenEmail: Button
    private lateinit var layoutResend: LinearLayout

    private lateinit var txtTimer: TextView
    private lateinit var txtSignIn: TextView
    private var countDownTimer: CountDownTimer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(
            R.layout.activity_check_email
        )

        initViews()

        setupListeners()

        startResendTimer()
    }

    private fun initViews() {

        btnBack = findViewById(R.id.btnBack)
        btnOpenEmail = findViewById(R.id.btnOpenEmail)
        layoutResend = findViewById(R.id.layoutResend)
        txtTimer = findViewById(R.id.txtTimer)
        txtSignIn = findViewById(R.id.txtSignIn)
    }

    private fun setupListeners() {

        // Back Button
        btnBack.setOnClickListener {
            animateButton(it)
            finish()
        }

        // Open Email Button
        btnOpenEmail.setOnClickListener {

            animateButton(it)

            btnOpenEmail.isEnabled = false

        }

        // Sign In Text
        txtSignIn.setOnClickListener {

            animateButton(it)

            val intent = Intent(
                this,
                SignInActivity::class.java
            )

            intent.flags =
                Intent.FLAG_ACTIVITY_NEW_TASK or
                        Intent.FLAG_ACTIVITY_CLEAR_TASK

            startActivity(intent)

            finish()
        }

        layoutResend.setOnClickListener {

            animateButton(it)

            startResendTimer()
        }
    }

    // Timer Function
    private fun startResendTimer() {

        countDownTimer?.cancel()

        countDownTimer =
            object : CountDownTimer(
                45000,
                1000
            ) {

                @SuppressLint("DefaultLocale")
                override fun onTick(
                    millisUntilFinished: Long
                ) {

                    val seconds =
                        millisUntilFinished / 1000

                    txtTimer.text =
                        String.format(
                            "   (00:%02d)",
                            seconds
                        )
                }

                @SuppressLint("SetTextI18n")
                override fun onFinish() {

                    txtTimer.text =
                        "   (00:00)"

                    if (!isFinishing && !isDestroyed) {

                        Toast.makeText(
                            this@CheckEmailActivity,
                            "You can resend the link now",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }

            }.start()
    }

    // ADD THIS BELOW startResendTimer()
    override fun onDestroy() {
        super.onDestroy()

        countDownTimer?.cancel()
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