package com.example.reshamkrishi

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast

class ChatbotFragment : Fragment() {

    private lateinit var btnAi: Button
    private lateinit var btnApp: Button

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        // Inflate the layout
        val view = inflater.inflate(
            R.layout.fragment_chatbot,
            container,
            false
        )

        // Initialize buttons
        btnAi = view.findViewById(R.id.btnAi)
        btnApp = view.findViewById(R.id.btnApp)

        // AI Assistant Button Click
        btnAi.setOnClickListener {

            Toast.makeText(
                requireContext(),
                "This service is not provided yet",
                Toast.LENGTH_SHORT
            ).show()
        }

        // App Bot Button Click
        btnApp.setOnClickListener {

            Toast.makeText(
                requireContext(),
                "This service is not provided yet",
                Toast.LENGTH_SHORT
            ).show()
        }

        return view
    }
}