package com.example.reshamkrishi

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment

class ShopFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val view = inflater.inflate(R.layout.fragment_shop, container, false)

        // Buttons
        val mulberryLeaves = view.findViewById<Button>(R.id.mulberryLeaves)
        val larva = view.findViewById<Button>(R.id.larva)
        val medicines = view.findViewById<Button>(R.id.medicines)
        val cocoon = view.findViewById<Button>(R.id.cocoon)
        val rawSilk = view.findViewById<Button>(R.id.rawsilk)
        val equipment = view.findViewById<Button>(R.id.equipment)

        // Click Listeners

        mulberryLeaves.setOnClickListener {

            openWebsite("https://www.google.com/search?q=mulberry+leaves")
        }

        larva.setOnClickListener {

            openWebsite("https://www.amazon.in/s?k=silkworm+larvae&crid=1CMKG74MS9EXF&sprefix=silkworm+larvae%2Caps%2C358&ref=nb_sb_noss_1")
        }

        medicines.setOnClickListener {

            openWebsite("https://www.google.com/search?q=silkworm+medicines")
        }

        cocoon.setOnClickListener {

            openWebsite("https://www.amazon.in/s?k=silkworm+cocoona&crid=25XWO4LAC9RL3&sprefix=silkworm+larvae%2Caps%2C1386&ref=nb_sb_noss_1")
        }

        rawSilk.setOnClickListener {

            openWebsite("https://www.amazon.in/s?k=raw+silk&ref=nb_sb_noss")
        }

        equipment.setOnClickListener {

            openWebsite("https://www.slideshare.net/slideshow/rearing-equipment-in-sericulture-pptx/266352108")
        }

        return view
    }

    private fun openWebsite(url: String) {

        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse(url)

        startActivity(intent)
    }
}