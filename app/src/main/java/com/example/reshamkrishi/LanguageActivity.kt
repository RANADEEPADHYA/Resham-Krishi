package com.example.reshamkrishi

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity


class LanguageActivity : AppCompatActivity() {

    // English
    private lateinit var langEnglish: LinearLayout
    private lateinit var iconEnglish: TextView
    private lateinit var textEnglish: TextView
    private lateinit var checkEnglish: FrameLayout
    private lateinit var checkIconEnglish: View

    // Hindi
    private lateinit var langHindi: LinearLayout
    private lateinit var iconHindi: TextView
    private lateinit var textHindi: TextView
    private lateinit var checkHindi: FrameLayout
    private lateinit var checkIconHindi: View

    // Bengali
    private lateinit var langBengali: LinearLayout
    private lateinit var iconBengali: TextView
    private lateinit var textBengali: TextView
    private lateinit var checkBengali: FrameLayout
    private lateinit var checkIconBengali: View

    // Kannada
    private lateinit var langKannada: LinearLayout
    private lateinit var iconKannada: TextView
    private lateinit var textKannada: TextView
    private lateinit var checkKannada: FrameLayout
    private lateinit var checkIconKannada: View

    // Tamil
    private lateinit var langTamil: LinearLayout
    private lateinit var iconTamil: TextView
    private lateinit var textTamil: TextView
    private lateinit var checkTamil: FrameLayout
    private lateinit var checkIconTamil: View

    // Telugu
    private lateinit var langTelugu: LinearLayout
    private lateinit var iconTelugu: TextView
    private lateinit var textTelugu: TextView
    private lateinit var checkTelugu: FrameLayout
    private lateinit var checkIconTelugu: View

    // Malayalam
    private lateinit var langMalayalam: LinearLayout
    private lateinit var iconMalayalam: TextView
    private lateinit var textMalayalam: TextView
    private lateinit var checkMalayalam: FrameLayout
    private lateinit var checkIconMalayalam: View

    // Marathi
    private lateinit var langMarathi: LinearLayout
    private lateinit var iconMarathi: TextView
    private lateinit var textMarathi: TextView
    private lateinit var checkMarathi: FrameLayout
    private lateinit var checkIconMarathi: View

    private lateinit var continueBtn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_language)
        initViews()

        // Default Selection
        selectLanguage(
            langEnglish,
            iconEnglish,
            textEnglish,
            checkEnglish,
            checkIconEnglish
        )

        // Click Listeners
        langEnglish.setOnClickListener {
            animateButton(it)

            selectLanguage(
                langEnglish,
                iconEnglish,
                textEnglish,
                checkEnglish,
                checkIconEnglish
            )
        }

        langHindi.setOnClickListener {
            animateButton(it)

            selectLanguage(
                langHindi,
                iconHindi,
                textHindi,
                checkHindi,
                checkIconHindi
            )
        }

        langBengali.setOnClickListener {
            animateButton(it)

            selectLanguage(
                langBengali,
                iconBengali,
                textBengali,
                checkBengali,
                checkIconBengali
            )
        }

        langKannada.setOnClickListener {
            animateButton(it)

            selectLanguage(
                langKannada,
                iconKannada,
                textKannada,
                checkKannada,
                checkIconKannada
            )
        }

        langTamil.setOnClickListener {

            animateButton(it)

            selectLanguage(
                langTamil,
                iconTamil,
                textTamil,
                checkTamil,
                checkIconTamil
            )
        }

        langTelugu.setOnClickListener {

            animateButton(it)

            selectLanguage(
                langTelugu,
                iconTelugu,
                textTelugu,
                checkTelugu,
                checkIconTelugu
            )
        }

        langMalayalam.setOnClickListener {

            animateButton(it)

            selectLanguage(
                langMalayalam,
                iconMalayalam,
                textMalayalam,
                checkMalayalam,
                checkIconMalayalam
            )
        }

        langMarathi.setOnClickListener {

            animateButton(it)

            selectLanguage(
                langMarathi,
                iconMarathi,
                textMarathi,
                checkMarathi,
                checkIconMarathi
            )
        }

        // Continue
        continueBtn.setOnClickListener {
            animateButton(it)

            val intent = Intent(this, IntroActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

    private fun initViews() {

        // Language Layouts
        langEnglish = findViewById(R.id.langEnglish)
        langHindi = findViewById(R.id.langHindi)
        langBengali = findViewById(R.id.langBengali)
        langKannada = findViewById(R.id.langKannada)

        langTamil = findViewById(R.id.langTamil)
        langTelugu = findViewById(R.id.langTelugu)
        langMalayalam = findViewById(R.id.langMalayalam)
        langMarathi = findViewById(R.id.langMarathi)

        // Icons
        iconEnglish = findViewById(R.id.iconEnglish)
        iconHindi = findViewById(R.id.iconHindi)
        iconBengali = findViewById(R.id.iconBengali)
        iconKannada = findViewById(R.id.iconKannada)

        iconTamil = findViewById(R.id.iconTamil)
        iconTelugu = findViewById(R.id.iconTelugu)
        iconMalayalam = findViewById(R.id.iconMalayalam)
        iconMarathi = findViewById(R.id.iconMarathi)

        // Texts
        textEnglish = findViewById(R.id.textEnglish)
        textHindi = findViewById(R.id.textHindi)
        textBengali = findViewById(R.id.textBengali)
        textKannada = findViewById(R.id.textKannada)

        textTamil = findViewById(R.id.textTamil)
        textTelugu = findViewById(R.id.textTelugu)
        textMalayalam = findViewById(R.id.textMalayalam)
        textMarathi = findViewById(R.id.textMarathi)

        // Check Layouts
        checkEnglish = findViewById(R.id.checkEnglish)
        checkHindi = findViewById(R.id.checkHindi)
        checkBengali = findViewById(R.id.checkBengali)
        checkKannada = findViewById(R.id.checkKannada)

        checkTamil = findViewById(R.id.checkTamil)
        checkTelugu = findViewById(R.id.checkTelugu)
        checkMalayalam = findViewById(R.id.checkMalayalam)
        checkMarathi = findViewById(R.id.checkMarathi)

        // Check Icons
        checkIconEnglish =
            findViewById(R.id.checkIconEnglish)

        checkIconHindi =
            findViewById(R.id.checkIconHindi)

        checkIconBengali =
            findViewById(R.id.checkIconBengali)

        checkIconKannada =
            findViewById(R.id.checkIconKannada)

        checkIconTamil =
            findViewById(R.id.checkIconTamil)

        checkIconTelugu =
            findViewById(R.id.checkIconTelugu)

        checkIconMalayalam =
            findViewById(R.id.checkIconMalayalam)

        checkIconMarathi =
            findViewById(R.id.checkIconMarathi)

        // Continue Button
        continueBtn = findViewById(R.id.btnContinue)
    }

    private fun resetSelections() {
        val layouts = listOf(
            langEnglish,
            langHindi,
            langBengali,
            langKannada,
            langTamil,
            langTelugu,
            langMalayalam,
            langMarathi
        )

        val icons = listOf(
            iconEnglish,
            iconHindi,
            iconBengali,
            iconKannada,
            iconTamil,
            iconTelugu,
            iconMalayalam,
            iconMarathi
        )

        val texts = listOf(
            textEnglish,
            textHindi,
            textBengali,
            textKannada,
            textTamil,
            textTelugu,
            textMalayalam,
            textMarathi
        )

        val checks = listOf(
            checkEnglish,
            checkHindi,
            checkBengali,
            checkKannada,
            checkTamil,
            checkTelugu,
            checkMalayalam,
            checkMarathi
        )

        val checkIcons = listOf(
            checkIconEnglish,
            checkIconHindi,
            checkIconBengali,
            checkIconKannada,
            checkIconTamil,
            checkIconTelugu,
            checkIconMalayalam,
            checkIconMarathi
        )

        layouts.forEach {
            it.isSelected = false
        }

        icons.forEach {
            it.isSelected = false
        }

        texts.forEach {
            it.isSelected = false
        }

        checks.forEach {
            it.isSelected = false
        }

        checkIcons.forEach {
            it.visibility = View.GONE
        }
    }

    private fun selectLanguage(
        layout: LinearLayout,
        icon: TextView,
        text: TextView,
        check: FrameLayout,
        checkIcon: View
    ) {

        resetSelections()

        layout.isSelected = true
        icon.isSelected = true
        text.isSelected = true
        check.isSelected = true

        checkIcon.visibility = View.VISIBLE
    }

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