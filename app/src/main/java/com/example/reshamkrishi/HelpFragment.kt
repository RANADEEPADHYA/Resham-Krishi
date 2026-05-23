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
import android.widget.Toast

class HelpFragment : Fragment() {

    private lateinit var etHelpMessage: EditText
    private lateinit var btnSendHelp: Button

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val view = inflater.inflate(R.layout.fragment_help, container, false)

        etHelpMessage = view.findViewById(R.id.etHelpMessage)
        btnSendHelp = view.findViewById(R.id.btnSendHelp)

        btnSendHelp.setOnClickListener {

            val message = etHelpMessage.text.toString().trim()

            if (message.isEmpty()) {
                Toast.makeText(requireContext(), "Please enter a message", Toast.LENGTH_SHORT).show()
            } else {

                val intent = Intent(Intent.ACTION_SENDTO).apply {

                    data = Uri.parse("mailto:")

                    putExtra(Intent.EXTRA_EMAIL,
                        arrayOf("adhyaranadeep@gmail.com"))

                    putExtra(Intent.EXTRA_SUBJECT,
                        "Silkworm App Support Request")

                    putExtra(Intent.EXTRA_TEXT, message)
                }

                startActivity(Intent.createChooser(intent, "Send Email"))
            }
        }

        return view
    }
}