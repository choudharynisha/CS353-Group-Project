package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import edu.brynmawr.cmsc353.journal.adapters.JournalEntryAdapter;

public class WeeklyJournalActivity extends AppCompatActivity {

    private static final String TAG = "WeeklyJournalActivity";
    private String userID;
    private List<String> journalDates;
    private List<String> journalEntries;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weekly_journal);

        if (Objects.isNull(this.userID)){
            this.userID = getIntent().getStringExtra("userID");
        }

        URL url = null;
        LocalDate date = LocalDate.now().minusDays(7);

        try {
            url = new URL("http://10.0.2.2:3000/getJournals?userID=" + userID + "&date=" + date.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        URL[] urls = {url};

        AsyncTask<URL, String, String> getJournals = new WeeklyJournalActivity.AccessWebTask().execute(urls);
    }

    protected void populateJournalsList(JSONArray journalEntries) {

        List<String> dates = new ArrayList<>();
        List<String> entries = new ArrayList<>();

        for (int i = 0; i < journalEntries.length(); i++) {
            try {
                JSONObject journalObject = journalEntries.getJSONObject(i);

                if (journalObject.has("date")) {
                    dates.add(String.valueOf(journalObject.get("date")).split("T")[0]);
                } else {
                    Log.w(TAG, "Journal Object has no date!");
                    continue;
                }

                if (journalObject.has("journalEntry")) {
                    entries.add((String) journalObject.get("journalEntry"));
                } else {
                    Log.w(TAG, "Journal Object has no text!");
                    continue;
                }
            } catch (JSONException e) {
                Log.e(TAG,"There was a problem processing the journal data!");
                e.printStackTrace();
            }
        }

        RecyclerView recyclerView = findViewById(R.id.rvJournals);

        JournalEntryAdapter entryAdapter = new JournalEntryAdapter(dates, entries);

        recyclerView.setAdapter(entryAdapter);

        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    private class AccessWebTask extends AsyncTask<URL, String, String> {

        @Override
        protected String doInBackground(URL... urls) {
            try {
                URL url = urls[0];

                //represents the connection to the URL
                Log.v(TAG, url.toString());

                HttpURLConnection conn = (HttpURLConnection) url.openConnection();

                conn.setRequestMethod("GET");

                conn.connect();

                // now the response comes back
                int responsecode = conn.getResponseCode();

                // make sure the response has "200 OK" as the status
                if (responsecode != 200) {
                    String errorCode = "Problem reading from the Database: " + responsecode;
                    Log.v(TAG, errorCode);
                    return "FailureToConnectToServer";
                } else {
                    try (BufferedReader br = new BufferedReader(
                            new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                        StringBuilder response = new StringBuilder();
                        String responseLine = null;
                        while ((responseLine = br.readLine()) != null) {
                            response.append(responseLine.trim());
                        }
                        Log.v(TAG, response.toString());
                        conn.disconnect();
                        return response.toString();
                    }
                }
            } catch (java.net.ConnectException e) {
                e.printStackTrace();
                return "FailureToConnectToServer";
            } catch (Exception e) {
                e.printStackTrace();
                return e.toString();
            }

        }

        @Override
        protected void onPostExecute(String s) {
            Log.v(TAG, s);

            if (s.equals("FailureToConnectToServer")) {
                //Need to print appropriate error
            }

            try {
                JSONArray arr = new JSONArray(s);

                if (arr.length() < 1) {
                    Toast toast = Toast.makeText(WeeklyJournalActivity.this,
                            "No Journal Entries to Show",
                            Toast.LENGTH_LONG);
                    toast.show();
                } else {
                    WeeklyJournalActivity.this.populateJournalsList(arr);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }
}