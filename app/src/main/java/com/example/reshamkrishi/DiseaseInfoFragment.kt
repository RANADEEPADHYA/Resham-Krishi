package com.example.reshamkrishi

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.Fragment

class DiseaseInfoFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val view = inflater.inflate(R.layout.fragment_disease_info, container, false)

        // Pebrine
        setupExpandableCard(
            view,
            R.id.btnPebrineExpand,
            R.id.layoutPebrineDetails
        )

        // Muscardine
        setupExpandableCard(
            view,
            R.id.btnMuscardineExpand,
            R.id.layoutMuscardineDetails
        )

        // Flacherie
        setupExpandableCard(
            view,
            R.id.btnFlacherieExpand,
            R.id.layoutFlacherieDetails
        )

        // Grasserie
        setupExpandableCard(
            view,
            R.id.btnGrasserieExpand,
            R.id.layoutGrasserieDetails
        )

        // Research Link 1
        val researchLink1 = view.findViewById<TextView>(R.id.txtResearchLink1)

        researchLink1.setOnClickListener {

            openLink("https://pmc.ncbi.nlm.nih.gov/articles/PMC10787931/")
        }

        // Research Link 2
        val researchLink2 = view.findViewById<TextView>(R.id.txtResearchLink2)

        researchLink2.setOnClickListener {

            openLink("https://www.sciencedirect.com/science/article/pii/S3050516X26000062")
        }

        return view
    }

    private fun setupExpandableCard(
        root: View,
        buttonId: Int,
        layoutId: Int
    ) {

        val button = root.findViewById<ImageView>(buttonId)
        val details = root.findViewById<LinearLayout>(layoutId)

        button.setOnClickListener {

            if (details.visibility == View.GONE) {

                details.visibility = View.VISIBLE
                button.animate().rotation(180f).setDuration(200).start()

            } else {

                details.visibility = View.GONE
                button.animate().rotation(0f).setDuration(200).start()
            }
        }
    }

    private fun openLink(url: String) {

        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        startActivity(intent)
    }
}