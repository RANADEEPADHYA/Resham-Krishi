package com.example.reshamkrishi

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast

class FeedbackFragment : Fragment() {

    private lateinit var feedback: EditText
    private lateinit var advice: EditText
    private lateinit var submitButton: Button

    // Expression Images
    private lateinit var veryBad: ImageView
    private lateinit var bad: ImageView
    private lateinit var average: ImageView
    private lateinit var good: ImageView
    private lateinit var excellent: ImageView

    // Selected Expression
    private var selectedExperience = "Not Selected"

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val view = inflater.inflate(R.layout.fragment_feedback, container, false)

        // EditTexts
        feedback = view.findViewById(R.id.feedback)
        advice = view.findViewById(R.id.advice)

        // Button
        submitButton = view.findViewById(R.id.btnSubmitFeedback)

        // ImageViews
        veryBad = view.findViewById(R.id.imgVeryBad)
        bad = view.findViewById(R.id.imgBad)
        average = view.findViewById(R.id.imgAverage)
        good = view.findViewById(R.id.imgGood)
        excellent = view.findViewById(R.id.imgExcellent)

        // Click Listeners
        veryBad.setOnClickListener {
            selectedExperience = "Very Bad"
            Toast.makeText(requireContext(), "Very Bad Selected", Toast.LENGTH_SHORT).show()
        }

        bad.setOnClickListener {
            selectedExperience = "Bad"
            Toast.makeText(requireContext(), "Bad Selected", Toast.LENGTH_SHORT).show()
        }

        average.setOnClickListener {
            selectedExperience = "Average"
            Toast.makeText(requireContext(), "Average Selected", Toast.LENGTH_SHORT).show()
        }

        good.setOnClickListener {
            selectedExperience = "Good"
            Toast.makeText(requireContext(), "Good Selected", Toast.LENGTH_SHORT).show()
        }

        excellent.setOnClickListener {
            selectedExperience = "Excellent"
            Toast.makeText(requireContext(), "Excellent Selected", Toast.LENGTH_SHORT).show()
        }

        // Submit Button
        submitButton.setOnClickListener {

            val feedbackText = feedback.text.toString().trim()
            val adviceText = advice.text.toString().trim()

            if (feedbackText.isEmpty() && adviceText.isEmpty()) {

                Toast.makeText(
                    requireContext(),
                    "Please write feedback or advice",
                    Toast.LENGTH_SHORT
                ).show()

            } else {

                // Final Message
                val fullMessage = """

                    User Experience:
                    $selectedExperience


                    Feedback:
                    $feedbackText


                    Advice:
                    $adviceText

                """.trimIndent()

                // Gmail Intent
                val intent = Intent(Intent.ACTION_SENDTO).apply {

                    data = Uri.parse("mailto:")

                    putExtra(
                        Intent.EXTRA_EMAIL,
                        arrayOf("yourgmail@gmail.com")
                    )

                    putExtra(
                        Intent.EXTRA_SUBJECT,
                        "Silkworm App Feedback"
                    )

                    putExtra(
                        Intent.EXTRA_TEXT,
                        fullMessage
                    )
                }

                try {

                    startActivity(
                        Intent.createChooser(intent, "Send Email")
                    )

                } catch (e: Exception) {

                    Toast.makeText(
                        requireContext(),
                        "No Email App Found",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }

        return view
    }
}