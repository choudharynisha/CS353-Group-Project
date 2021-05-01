package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.google.android.material.textfield.TextInputEditText;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Objects;

public class JournalEntryActivity extends AppCompatActivity {

    private static final String TAG = "JournalEntryActivity";

    private String userID;
    private TextInputEditText editTxtJournalEntry;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_journal_entry);

        if (this.userID == null){
            this.userID = getIntent().getStringExtra("userID");
        }

        editTxtJournalEntry = findViewById(R.id.editTxtJournalEntry);
    }

    protected JSONObject makeJournalEntry(String entry) {
        JSONObject journalEntry = new JSONObject();
        LocalDate date = LocalDate.now();

        try {
            journalEntry.put("userID", userID);
            journalEntry.put("date", date.toString());
            journalEntry.put("journalEntry", entry);

            return journalEntry;
        } catch (JSONException e) {
            Log.e(TAG, e.getMessage());
        }
        return null;
    }

    public void onClickClear(View v) {
        editTxtJournalEntry.getText().clear();
    }

    public void onClickSubmit(View v) {
        String journalEntry = editTxtJournalEntry.getText().toString();

        if (journalEntry != null && !journalEntry.isEmpty())
        {
            try {
                URL url = new URL("http://10.0.2.2:3000/createJournal");

                JSONObject entry = makeJournalEntry(journalEntry);

                Wrapper wrapper = new Wrapper(url, entry, "journalEntry");
                //https://stackoverflow.com/questions/3075009/android-how-can-i-pass-parameters-to-asynctasks-onpreexecute
                Wrapper[] wrappers = { wrapper };
                AsyncTask<Wrapper, String, String> writeDB = new AccessWebTask().execute(wrappers);

            } catch (MalformedURLException e) {
                Log.e(TAG, e.getMessage());
            }
        }
        else
        {
            Log.v(TAG, "Text field empty or null. Abort submission.");
        }
    }

    public void onClickReturnToMain(View v) {
        finish();
    }

    private class AccessWebTask extends AsyncTask<Wrapper, String, String> {

        @Override
        protected String doInBackground(Wrapper... wrappers) {
            try {
                Wrapper w = wrappers[0];

                //represents the connection to the URL
                URL url = w.getUrl();
                JSONObject entry = w.getEntry();
                String which = w.getWhich();

                //represents the connection to the URL
                Log.v(TAG, url.toString());

                HttpURLConnection conn = (HttpURLConnection)url.openConnection();

                conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoInput(true);
                conn.setDoOutput(true);
                conn.setRequestMethod("POST");


                // this is the JSON that you want to send
                // note that you need double-quotes around strings
                // and need to escape those double-quotes with the backslash character
                //String json = "{\"username\":\"root\",\"password\":\"password\"}";
                String json = entry.toString();

                Log.v(TAG, json);

                byte[] bytes = json.getBytes(StandardCharsets.UTF_8);

                try(OutputStream os = conn.getOutputStream()) {
                    os.write(bytes, 0, bytes.length);
                    Log.v(TAG, "Enter Here?");
                }

                conn.connect();

                // now the response comes back
                int responsecode = conn.getResponseCode();

                // make sure the response has "200 OK" as the status
                if (responsecode != 200) {
                    String errorCode = "Problem writing to the Database: " + responsecode;
                    System.out.println(errorCode);
                    return errorCode;
                }
                else {

                    try(BufferedReader br = new BufferedReader(
                            new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                        StringBuilder response = new StringBuilder();
                        String responseLine = null;
                        while ((responseLine = br.readLine()) != null) {
                            response.append(responseLine.trim());
                        }
                        System.out.println(response.toString());
                        return response.toString();
                    }
                }
            }
            catch (Exception e) {
                e.printStackTrace();
                return e.toString();
            }

        }

        @Override
        protected void onPostExecute(String s) {
            // this method would be called in the UI thread after doInBackground finishes
            // it can access the Views and update them asynchronously
            //https://stackoverflow.com/questions/1816458/getting-hold-of-the-outer-class-object-from-the-inner-class-object
            editTxtJournalEntry.getText().clear();
        }

    }
}