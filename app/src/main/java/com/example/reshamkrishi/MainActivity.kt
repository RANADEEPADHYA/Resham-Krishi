package com.example.reshamkrishi

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.navigation.NavigationView

class MainActivity : AppCompatActivity() {

    private lateinit var txtName: TextView
    private lateinit var txtEmail: TextView

    private lateinit var txtToolbarTitle: TextView

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var navigationView: NavigationView
    private lateinit var bottomNavigation: BottomNavigationView

    private lateinit var btnMenu: ImageView
    private lateinit var btnBack: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val notificationLayout =
            findViewById<FrameLayout>(R.id.notificationLayout)
        // Views
        btnMenu = findViewById(R.id.btnMenu)
        drawerLayout = findViewById(R.id.drawerLayout)
        navigationView = findViewById(R.id.navigationView)
        bottomNavigation = findViewById(R.id.bottomNavigation)

        btnMenu = findViewById(R.id.btnMenu)
        btnBack = findViewById(R.id.btnBack)

        txtToolbarTitle = findViewById(R.id.txtToolbarTitle)

        // Default Fragment

        replaceFragment(HomeFragment(), "Home", false)

        // Drawer Open

        btnMenu.setOnClickListener {

            drawerLayout.openDrawer(GravityCompat.END)

        }

        notificationLayout.setOnClickListener {

            replaceFragment(
                NotificationFragment(),
                "Notifications",
                true
            )

        }

        // Back Button

        btnBack.setOnClickListener {

            supportFragmentManager.popBackStack()

        }

        // Bottom Navigation

        bottomNavigation.setOnItemSelectedListener { item ->

            when (item.itemId) {

                R.id.nav_home -> {

                    replaceFragment(HomeFragment(), "Home", false)
                    true
                }

                R.id.nav_chatbot -> {

                    replaceFragment(ChatbotFragment(), "Chatbot", true)
                    true
                }

                R.id.nav_scan -> {

                    replaceFragment(ScanFragment(), "Scan", true)
                    true
                }

                R.id.nav_history -> {

                    replaceFragment(HistoryFragment(), "History", true)
                    true
                }

                R.id.nav_shop -> {

                    replaceFragment(ShopFragment(), "Shop", true)
                    true
                }

                else -> false
            }

        }

        // Drawer Header

        val headerView = navigationView.getHeaderView(0)

        txtName = headerView.findViewById(R.id.txtName)
        txtEmail = headerView.findViewById(R.id.txtEmail)

        // Shared Preferences

        val sharedPref = getSharedPreferences(
            "UserData",
            MODE_PRIVATE
        )

        val userName = sharedPref.getString(
            "user_name",
            "User"
        )

        val userEmail = sharedPref.getString(
            "user_email",
            "No Email"
        )

        txtName.text = userName
        txtEmail.text = userEmail

        // Drawer Navigation

        navigationView.setNavigationItemSelectedListener { item ->

            when (item.itemId) {

                R.id.nav_profile -> {
                    replaceFragment(ProfileFragment(), "Profile", true)
                }

                R.id.nav_history -> {
                    replaceFragment(HistoryFragment(), "History", true)
                }

                R.id.nav_chatbot -> {
                    replaceFragment(ChatbotFragment(), "Chatbot", true)
                }

                R.id.nav_notification -> {
                    replaceFragment(NotificationFragment(), "Notifications", true)
                }

                R.id.nav_community -> {
                    replaceFragment(CommunityFragment(), "Community", true)
                }

                R.id.nav_disease_info -> {
                    replaceFragment(DiseaseInfoFragment(), "Disease Info", true)
                }

                R.id.nav_climate_info -> {
                    replaceFragment(ClimateInfoFragment(), "Climate", true)
                }

                R.id.nav_help -> {
                    replaceFragment(HelpFragment(), "Help", true)
                }

                R.id.nav_feedback -> {
                    replaceFragment(FeedbackFragment(), "Feedback", true)
                }

                R.id.nav_settings -> {
                    replaceFragment(SettingsFragment(), "Settings", true)
                }

                R.id.nav_share -> {
                    replaceFragment(ShareFragment(), "Share", true)
                }

                R.id.nav_rate -> {
                    replaceFragment(RateFragment(), "Rate App", true)
                }

                R.id.nav_logout -> {
                    replaceFragment(LogOutFragment(), "Logout", true)
                }

                R.id.nav_leaf_scan -> {

                    startActivity(
                        Intent(
                            this,
                            ScanLeafActivity::class.java
                        )
                    )
                }

                R.id.nav_disease_scan -> {

                    startActivity(
                        Intent(
                            this,
                            ScanDiseaseActivity::class.java
                        )
                    )
                }
            }

            drawerLayout.closeDrawer(GravityCompat.END)

            true
        }

        // Back Stack Listener

        supportFragmentManager.addOnBackStackChangedListener {

            if (supportFragmentManager.backStackEntryCount == 0) {

                btnBack.visibility = ImageView.GONE
                txtToolbarTitle.text = "Home"

            } else {

                btnBack.visibility = ImageView.VISIBLE
            }
        }
    }

    // Replace Fragment

    private fun replaceFragment(
        fragment: Fragment,
        title: String,
        showBack: Boolean
    ) {

        val transaction =
            supportFragmentManager.beginTransaction()
                .replace(R.id.fragmentContainer, fragment)

        if (showBack) {

            transaction.addToBackStack(null)

            btnBack.visibility = ImageView.VISIBLE

        } else {

            btnBack.visibility = ImageView.GONE
        }

        txtToolbarTitle.text = title

        transaction.commit()
    }

    // Back Press

    @SuppressLint("GestureBackNavigation")
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {

        if (drawerLayout.isDrawerOpen(GravityCompat.END)) {

            drawerLayout.closeDrawer(GravityCompat.END)

        } else {

            if (supportFragmentManager.backStackEntryCount > 0) {

                supportFragmentManager.popBackStack()

            } else {

                super.onBackPressed()
            }
        }
    }
}