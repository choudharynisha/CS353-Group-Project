package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.widget.TextView;

import java.net.URL;

public class MainActivity extends AppCompatActivity {

//    private final String userID = "608472f6074c2832e4e1dc9b";
//    private final String email = "cat@fakemail.com";
    private final String email = "dog@fakemail.com";
    private final String userID = "608c19f532c5da92d1d6e0f9";
    private static final int COUNTER_ACTIVITY_ID = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

    public void onClickLaunchMHT(View v){
        Intent i = new Intent(this, TrackMHActivity.class);
        i.putExtra("userID", this.userID);
        startActivityForResult(i, COUNTER_ACTIVITY_ID);
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent intent){
        super.onActivityResult(requestCode, resultCode, intent);
    }

    /*public void onConnectButtonClick(View v) {

        TextView tv = findViewById(R.id.titleField);

        try {
            // assumes that there is a server running on the AVD's host on port 3000
            // and that it has a /test endpoint that returns a JSON object with
            // a field called "status"
            URL url = new URL("http://10.0.2.2:3000/test");

            AccessWebTask task = new AccessWebTask();
            task.execute();
            String status = task.get();

            tv.setText(status);

        }
        catch (Exception e) {
            // uh oh
            e.printStackTrace();
            tv.setText(e.toString());
        }


    }*/

    public void onClickLaunchGoalSet(View view) {
        Intent i = new Intent(this, SetGoalActivity.class);
        i.putExtra("userID", this.userID);
        startActivityForResult(i, COUNTER_ACTIVITY_ID);
    }

    public void onClickLaunchAddJournal(View view) {
        Intent i = new Intent(this, JournalEntryActivity.class);
        i.putExtra("userID", this.userID);
        startActivity(i);
    }
}