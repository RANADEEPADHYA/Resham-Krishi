package com.example.reshamkrishi

import android.view.LayoutInflater
import android.content.Intent
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2

class IntroPagerAdapter(
    private val viewPager: ViewPager2,
    private val onLastButtonClick: () -> Unit
) : RecyclerView.Adapter<IntroPagerAdapter.ViewPagerHolder>() {

    private val layouts = listOf(
        R.layout.activity_intro_first,
        R.layout.activity_intro_second,
        R.layout.activity_intro_third
    )

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): ViewPagerHolder {

        val view = LayoutInflater.from(parent.context)
            .inflate(layouts[viewType], parent, false)

        return ViewPagerHolder(view)
    }

    override fun getItemCount(): Int = layouts.size

    override fun onBindViewHolder(
        holder: ViewPagerHolder,
        position: Int
    ) {

        // FIRST SCREEN BUTTON
        if (position == 0) {

            val btnGetStarted =
                holder.itemView.findViewById<View>(R.id.btnGetStated)

            btnGetStarted.setOnClickListener {

                it.animate()
                    .scaleX(0.96f)
                    .scaleY(0.96f)
                    .setDuration(80)
                    .withEndAction {

                        it.animate()
                            .scaleX(1f)
                            .scaleY(1f)
                            .setDuration(80)
                            .start()

                        viewPager.currentItem = 1
                    }
                    .start()
            }
        }

        // SECOND SCREEN BUTTON
        if (position == 1) {

            val btnContinue =
                holder.itemView.findViewById<View>(R.id.btnContinue)

            btnContinue.setOnClickListener {

                it.animate()
                    .scaleX(0.96f)
                    .scaleY(0.96f)
                    .setDuration(80)
                    .withEndAction {

                        it.animate()
                            .scaleX(1f)
                            .scaleY(1f)
                            .setDuration(80)
                            .start()

                        viewPager.currentItem = 2
                    }
                    .start()
            }
        }

        // THIRD SCREEN BUTTON
        if (position == 2) {

            val btnBegin =
                holder.itemView.findViewById<View>(R.id.btnBegin)

            btnBegin.setOnClickListener {

                it.animate()
                    .scaleX(0.96f)
                    .scaleY(0.96f)
                    .setDuration(80)
                    .withEndAction {

                        it.animate()
                            .scaleX(1f)
                            .scaleY(1f)
                            .setDuration(80)
                            .start()

                        onLastButtonClick.invoke()
                    }
                    .start()
            }
        }
    }

    override fun getItemViewType(position: Int): Int {
        return position
    }

    class ViewPagerHolder(itemView: View) :
        RecyclerView.ViewHolder(itemView)
}