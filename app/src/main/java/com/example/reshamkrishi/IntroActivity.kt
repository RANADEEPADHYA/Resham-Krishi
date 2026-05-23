package com.example.reshamkrishi

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2

class IntroActivity : AppCompatActivity() {

    private lateinit var viewPager: ViewPager2

    private lateinit var dot1: View
    private lateinit var dot2: View
    private lateinit var dot3: View

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_intro)

        viewPager = findViewById(R.id.viewPagerIntro)

        dot1 = findViewById(R.id.dot1)
        dot2 = findViewById(R.id.dot2)
        dot3 = findViewById(R.id.dot3)

        // Disable Swipe
        viewPager.isUserInputEnabled = false

        // Adapter
        val adapter = IntroPagerAdapter(
            viewPager,
            onLastButtonClick = {

                // SAVE INTRO STATUS
                val sharedPreferences =
                    getSharedPreferences(
                        "AppPrefs",
                        MODE_PRIVATE
                    )

                sharedPreferences.edit()
                    .putBoolean(
                        "INTRO_FINISHED",
                        true
                    )
                    .apply()

                // OPEN SIGN IN
                startActivity(
                    Intent(
                        this,
                        SignInActivity::class.java
                    )
                )

                finish()
            }
        )

        viewPager.adapter = adapter

        // Dot Animation
        viewPager.registerOnPageChangeCallback(object :
            ViewPager2.OnPageChangeCallback() {

            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)

                updateDots(position)
            }
        })
    }

    private fun updateDots(position: Int) {

        dot1.setBackgroundResource(R.drawable.dot_inactive)
        dot2.setBackgroundResource(R.drawable.dot_inactive)
        dot3.setBackgroundResource(R.drawable.dot_inactive)

        when (position) {

            0 -> animateDot(dot1)

            1 -> animateDot(dot2)

            2 -> animateDot(dot3)
        }
    }

    private fun animateDot(view: View) {

        view.setBackgroundResource(R.drawable.dot_active)

        val scaleX =
            ObjectAnimator.ofFloat(view, "scaleX", 1f, 1.5f, 1f)

        val scaleY =
            ObjectAnimator.ofFloat(view, "scaleY", 1f, 1.5f, 1f)

        scaleX.duration = 300
        scaleY.duration = 300

        val animatorSet = AnimatorSet()

        animatorSet.playTogether(scaleX, scaleY)

        animatorSet.start()
    }
}