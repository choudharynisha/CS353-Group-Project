package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class JournalEntryActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_journal_entry);
    }

    public void onClickReturnToMain(View v) {
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }
}