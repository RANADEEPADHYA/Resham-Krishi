package com.example.reshamkrishi

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.firebase.auth.FirebaseAuth

class LogOutFragment : Fragment() {

    private lateinit var btnLogout: LinearLayout
    private lateinit var btnCancel: LinearLayout

    @SuppressLint("MissingInflatedId")
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        val view =
            inflater.inflate(
                R.layout.fragment_log_out,
                container,
                false
            )

        // Buttons
        btnLogout =
            view.findViewById(R.id.btnLogout)

        btnCancel =
            view.findViewById(R.id.btnCancel)

        // LOGOUT BUTTON
        btnLogout.setOnClickListener {

            // Firebase Sign Out
            FirebaseAuth
                .getInstance()
                .signOut()

            // Google Sign Out
            GoogleSignIn.getClient(
                requireActivity(),

                GoogleSignInOptions.Builder(
                    GoogleSignInOptions.DEFAULT_SIGN_IN
                )
                    .requestEmail()
                    .build()

            ).signOut()

            // Open Sign In Screen
            startActivity(
                Intent(
                    requireActivity(),
                    SignInActivity::class.java
                )
            )

            requireActivity().finishAffinity()
        }

        // CANCEL BUTTON
        btnCancel.setOnClickListener {

            requireActivity()
                .supportFragmentManager
                .popBackStack()
        }

        return view
    }
}