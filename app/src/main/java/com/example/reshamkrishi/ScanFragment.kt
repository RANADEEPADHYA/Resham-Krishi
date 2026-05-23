package com.example.reshamkrishi

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout

class ScanFragment : Fragment() {

    private lateinit var scanLeaf: LinearLayout
    private lateinit var scanDisease: LinearLayout

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        val view = inflater.inflate(
            R.layout.fragment_scan,
            container,
            false
        )

        // Initialize Views
        scanLeaf = view.findViewById(R.id.scanLeaf)
        scanDisease = view.findViewById(R.id.scanDisease)

        // Open Leaf Scan Screen
        scanLeaf.setOnClickListener {

            val intent = Intent(
                requireContext(),
                ScanLeafActivity::class.java
            )

            startActivity(intent)
        }

        // Open Disease Scan Screen
        scanDisease.setOnClickListener {

            val intent = Intent(
                requireContext(),
                ScanDiseaseActivity::class.java
            )

            startActivity(intent)
        }

        return view
    }
}